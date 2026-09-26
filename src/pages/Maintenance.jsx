import { Wrench } from 'lucide-react'

export default function Maintenance() {
  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Maintenance Logs</span>
        <button className="btn-primary">Schedule Service</button>
      </div>
      <div className="glass-panel" style={{ padding: '24px', marginTop: '24px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Service Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Truck 101</td>
              <td>Oil Change</td>
              <td>Oct 12, 2026</td>
              <td><span className="badge badge-warning">Upcoming</span></td>
            </tr>
            <tr>
              <td>Trailer 55A</td>
              <td>Tire Replacement</td>
              <td>Sep 20, 2026</td>
              <td><span className="badge badge-success">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
