import "./SetHeaders.scss"

export default function SetHeaders() {
  return (
    <div className="header-options">
      <div className="checkbox-option">
        <input type="checkbox" id="row-header" />
        <label htmlFor="row-header">Set 1st row as header</label>
      </div>

      <div className="checkbox-option">
        <input type="checkbox" id="column-header" defaultChecked />
        <label htmlFor="column-header">Set 1st column as header</label>
      </div>

      <div className="checkbox-option">
        <input type="checkbox" id="column-divider" />
        <label htmlFor="column-divider">Show column divider</label>
      </div>

      <div className="header-options2">
        <div className="checkbox-option">
          <input type="checkbox" id="row-divider" />
          <label htmlFor="row-divider">Show row divider</label>
        </div>

        <div className="checkbox-option">
          <input type="checkbox" id="column-title" defaultChecked />
          <label htmlFor="column-title">Show column title</label>
        </div>
      </div>
    </div>
  );
}
