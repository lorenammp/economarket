import "./style.css";

function PageTitle({ title, children }) {
  return (
    <div className="pageTitleContainer">
      <div className="titleText">
        <h2 className="pageTitle">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default PageTitle;
