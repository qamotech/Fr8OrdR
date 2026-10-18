import os
import sys
import time
import tempfile
import subprocess
import re
import html
from pathlib import Path

if sys.platform == "win32" and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
INDEX_HTML = ROOT / "index.html"
CHROME_EXE = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

if not INDEX_HTML.exists():
    print(f"FAIL: {INDEX_HTML} not found")
    sys.exit(1)

if not os.path.exists(CHROME_EXE):
    print(f"FAIL: Chrome not found at {CHROME_EXE}")
    sys.exit(1)

HARNESS_JS = """
<script>
window.__test_report = [];
function log(msg) {
  window.__test_report.push(msg);
  console.log(msg);
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runTest() {
  log("Starting Fr8OrdR Demo Sequence Test...");
  
  // Wait for React app to mount
  for (let i = 0; i < 60; i++) {
    if (document.getElementById('demo-tour-btn')) break;
    await sleep(100);
  }

  const demoBtn = document.getElementById('demo-tour-btn');
  if (!demoBtn) {
    log("FAIL: #demo-tour-btn not found in DOM");
    finish();
    return;
  }
  log("PASS: Found #demo-tour-btn in Header");

  // Click Play Demo
  demoBtn.click();
  await sleep(400);

  const tourRoot = document.getElementById('fr8-tour-root');
  if (!tourRoot) {
    log("FAIL: Tour root #fr8-tour-root not visible after clicking Play Demo");
    finish();
    return;
  }
  log("PASS: Tour overlay opened successfully");

  // Step through 14 tour steps
  for (let step = 1; step <= 14; step++) {
    await sleep(350);
    const tooltip = document.querySelector('.tour-tooltip');
    if (!tooltip) {
      log("FAIL: Step " + step + ": .tour-tooltip not found");
      finish();
      return;
    }

    const titleEl = tooltip.querySelector('h3');
    const badgeEl = tooltip.querySelector('.tour-badge span');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const badge = badgeEl ? badgeEl.textContent.trim() : '';

    log("PASS: Tour Step " + step + "/14 verified: [" + badge + "] " + title);

    const nextBtn = tooltip.querySelector('.btn-primary');
    if (!nextBtn) {
      log("FAIL: Step " + step + ": Next button not found");
      finish();
      return;
    }
    nextBtn.click();
  }

  // Wait for completion modal
  await sleep(400);
  const headings = Array.from(document.querySelectorAll('h2'));
  const finishHeading = headings.find(h => h.textContent.includes('Tour Complete'));
  if (!finishHeading) {
    log("FAIL: Tour completion modal did not appear");
    finish();
    return;
  }
  log("PASS: Tour completion modal verified: " + finishHeading.textContent.trim());

  // Click Enter Command Center
  const enterBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enter Command Center'));
  if (enterBtn) {
    enterBtn.click();
    await sleep(300);
    if (!document.getElementById('fr8-tour-root')) {
      log("PASS: Tour closed cleanly and user returned to Command Center");
    } else {
      log("FAIL: Tour root still present after clicking Enter Command Center");
    }
  }

  log("ALL DEMO SEQUENCE TESTS PASSED (14/14 steps + completion modal)");
  finish();
}

function finish() {
  const pre = document.createElement('pre');
  pre.id = 'RESULT';
  pre.textContent = window.__test_report.join('\\n');
  document.body.appendChild(pre);
}

window.addEventListener('load', () => {
  setTimeout(runTest, 600);
});
</script>
"""

def main():
    content = INDEX_HTML.read_text(encoding="utf-8")
    last_body = content.rfind("</body>")
    if last_body == -1:
        print("FAIL: </body> tag not found in index.html")
        sys.exit(1)

    test_html = content[:last_body] + HARNESS_JS + content[last_body:]

    with tempfile.TemporaryDirectory() as tmpdir:
        test_file = Path(tmpdir) / "test_run.html"
        test_file.write_text(test_html, encoding="utf-8")
        user_data_dir = Path(tmpdir) / "ud"
        user_data_dir.mkdir()

        cmd = [
            CHROME_EXE,
            "--headless=new",
            "--disable-gpu",
            "--no-first-run",
            f"--user-data-dir={user_data_dir}",
            "--virtual-time-budget=90000",
            "--dump-dom",
            f"file:///{test_file.as_posix()}"
        ]

        print("Running Fr8OrdR demo sequence verification in headless Chrome...")
        proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="ignore")
        dom = proc.stdout

        match = re.search(r'<pre id="RESULT">(.*?)</pre>', dom, re.DOTALL)
        if not match:
            print("FAIL: No <pre id=\"RESULT\"> found. Chrome DOM Dump:")
            print(dom[-1500:])
            sys.exit(1)

        result_text = html.unescape(match.group(1)).strip()
        print("\n=== TEST EXECUTION RESULTS ===")
        print(result_text)
        print("===============================\n")

        if "FAIL" in result_text or "ALL DEMO SEQUENCE TESTS PASSED" not in result_text:
            print("Test suite FAILED.")
            sys.exit(1)

        print("Test suite PASSED successfully!")
        sys.exit(0)

if __name__ == "__main__":
    main()
