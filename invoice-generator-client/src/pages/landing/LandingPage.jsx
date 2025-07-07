import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    <>
      <div className="container">
        <div className="text-center">
          <span className="badge bg-primary m-4">
            ✨ Create professional invoices in seconds
          </span>

          <h1 className="display-4 fw-bold mb-4 landing-title">
            Invoice Generation
            <span className="d-block text-primary">Made Simple</span>
          </h1>

          <p className="lead text-secondary mb-4 mx-auto landing-lead">
            Create, customize, and send professional invoices instantly.
            Streamline your billing process and get paid faster with our intuitive platform.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-5 landing-btn-group">
           <Link to="/generate" className="text-decoration-none">
            <button className="btn btn-primary btn-lg px-4">
              Start Creating Invoices
            </button>
           </Link>
          </div>

          <div className="d-flex justify-content-center landing-step"></div>
        </div>

        <div className="text-center mt-5">
          <h2 className="fw-bold mb-4">Get Started in 4 Simple Steps</h2>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3 landing-step-icon">
                  1
                </div>
                <h5 className="fw-bold mb-2">Enter details</h5>
                <p className="text-secondary mb-0" style={{ fontSize: 15 }}>
                  Quickly fill in your client’s information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center mb-3 landing-step-icon">
                  2
                </div>
                <h5 className="fw-bold mb-2">Choose Template</h5>
                <p className="text-secondary mb-0" style={{ fontSize: 15 }}>
                  Browse our gallery of professionally designed templates. Pick one that matches your brand and style.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="rounded-circle bg-warning text-white d-inline-flex align-items-center justify-content-center mb-3 landing-step-icon">
                  3
                </div>
                <h5 className="fw-bold mb-2">Preview Invoice</h5>
                <p className="text-secondary mb-0" style={{ fontSize: 15 }}>
                  See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center">
                <div className="rounded-circle bg-info text-white d-inline-flex align-items-center justify-content-center mb-3 landing-step-icon">
                  4
                </div>
                <h5 className="fw-bold mb-2">Download &amp; Save</h5>
                <p className="text-secondary mb-0" style={{ fontSize: 15 }}>
                  Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="feature-section py-5 ">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold display-5">Powerful Features for Your Business</h2>
              <p className="text-secondary fs-5">
                Everything you need to create, manage, and send invoices with ease.
              </p>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 border-0 shadow-lg">
                  <img
                    src="https://th.bing.com/th/id/OIP.hrEOweSnUG7m87oPDSpuHAHaHa?rs=1&pid=ImgDetMain"
                    alt="Customizable Templates"
                    className="card-img-top"
                    style={{ height: 220, objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-file-earmark-text fs-1 text-primary"></i>
                    </div>
                    <h5 className="fw-bold mb-2">Customizable Templates</h5>
                    <p className="text-secondary mb-0">
                      Choose from a variety of templates and personalize them to match your brand.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 border-0 shadow-lg">
                  <img
                    src="https://www.multcloud.com/screenshot/en/others-1/others/download-image-and-video.png"
                    alt="Instant PDF Download"
                    className="card-img-top"
                    style={{ height: 220, objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-cloud-arrow-down fs-1 text-success"></i>
                    </div>
                    <h5 className="fw-bold mb-2">Instant PDF Download</h5>
                    <p className="text-secondary mb-0">
                      Download invoices as PDF files instantly for easy sharing and record-keeping.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 border-0 shadow-lg">
                  <img
                    src="https://th.bing.com/th/id/OIP.A1xIJluaOCqGpKB0jFd-wgHaEf?rs=1&pid=ImgDetMain"
                    alt="Email Invoices"
                    className="card-img-top"
                    style={{ height: 220, objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-envelope-paper fs-1 text-warning"></i>
                    </div>
                    <h5 className="fw-bold mb-2">Email Invoices</h5>
                    <p className="text-secondary mb-0">
                      Send invoices directly to your clients’ inboxes with just a click.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Expanded Features */}
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 border-0 shadow-lg">
                  <img
                    src="https://th.bing.com/th/id/OIP.3DuTb5kzcLM1WFOcNjVOZQHaD6?rs=1&pid=ImgDetMain"
                    alt="Secure Data"
                    className="card-img-top"
                    style={{ height: 220, objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-shield-lock fs-1 text-info"></i>
                    </div>
                    <h5 className="fw-bold mb-2">Secure Data</h5>
                    <p className="text-secondary mb-0">
                      Your data is encrypted and securely stored, ensuring privacy and peace of mind.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 border-0 shadow-lg">
                  <img
                    src="https://th.bing.com/th/id/OIP.MLq-XrtBvL-UtNx2ww0PigHaEo?rs=1&pid=ImgDetMain"
                    alt="Multi-Device Access"
                    className="card-img-top"
                    style={{ height: 220, objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-laptop fs-1 text-danger"></i>
                    </div>
                    <h5 className="fw-bold mb-2">Multi-Device Access</h5>
                    <p className="text-secondary mb-0">
                      Access your invoices from any device, anywhere, anytime.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 border-0 shadow-lg">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/021/392/827/original/trend-analysis-marketing-and-sales-information-analyze-or-predict-trend-line-or-profit-business-forecast-report-concept-businessman-analyst-analyze-trend-graph-and-chart-with-magnifying-glass-vector.jpg"
                    alt="Analytics & Reports"
                    className="card-img-top"
                    style={{ height: 220, objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <i className="bi bi-bar-chart-line fs-1 text-secondary"></i>
                    </div>
                    <h5 className="fw-bold mb-2">Analytics &amp; Reports</h5>
                    <p className="text-secondary mb-0">
                      Track your invoices, payments, and business growth with insightful analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
         <div className="get-started-section d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '50vh', background: '#145DFF' }}>
      <h1 className="fw-bold mb-3" style={{ fontSize: '3rem', color: '#fff' }}>
        Ready to Streamline Your Invoicing?
      </h1>
      <p className="lead mb-4" style={{ color: '#fff', maxWidth: 600 }}>
        Join thousands of freelancers and small businesses who trust QuickInvoice. Start creating professional invoices today – it's fast, easy, and effective!
      </p>
      <button className="btn btn-warning btn-lg fw-bold px-4 py-2 mb-2" style={{ fontSize: '1.3rem', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
        Start Generating Invoices Now
      </button>
      <div style={{ color: '#fff', fontSize: 14, marginTop: 8 }}>
        (This will lead to the invoice generation interface)
      </div>
    </div>
    </>
  );
}

export default LandingPage;