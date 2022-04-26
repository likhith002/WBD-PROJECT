import { Link } from "react-router-dom";
function Error() {
  return (
    <div style={{ alignItems: "center", position: "middle" }}>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      {/* Tell the browser to be responsive to screen width */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link
        rel="canonical"
        href="https://www.wrappixel.com/templates/ample-admin-lite/"
      />
      {/* Favicon icon */}
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="plugins/images/favicon.png"
      />
      {/* Custom CSS */}
      <link href="css/style.min.css" rel="stylesheet" />

      <div className="main-wrapper">
        <div className="preloader">
          <div className="lds-ripple">
            <div className="lds-pos" />
            <div className="lds-pos" />
          </div>
        </div>

        <div className="error-box">
          <div className="error-body text-center">
            <h1 className="error-title text-primary">404</h1>
            <h3 className="text-uppercase error-subtitle">PAGE NOT FOUND !</h3>
            <p className="text-muted mt-4 mb-4">
              YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
            </p>
            <Link
              to="/"
              className="btn btn-primary btn-rounded waves-effect waves-light mb-5 text-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
