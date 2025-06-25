import React from 'react';
import Logo from './Logo';
import { FileText, Filter } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-dark text-white py-5 px-3">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-md-6">
                        <div className="d-flex align-items-center mb-3">
                            <Logo/>
                            <span className="fs-3 fw-bold">Billify</span>
                        </div>
                        <p className="text-secondary mb-4" style={{ maxWidth: '28rem' }}>
                            The modern solution for professional invoice generation.
                            Create, customize, and send invoices that get you paid faster.
                        </p>
                    </div>

                    <div className="col-md-3">
                        <h5 className="fw-semibold mb-3">Product</h5>
                        <ul className="list-unstyled text-secondary">
                            <li><a href="#" className="text-secondary text-decoration-none hover-link">Features</a></li>
                            <li><a href="#" className="text-secondary text-decoration-none hover-link">Pricing</a></li>
                            <li><a href="#" className="text-secondary text-decoration-none hover-link">Templates</a></li>
                            <li><a href="#" className="text-secondary text-decoration-none hover-link">Integrations</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h5 className="fw-semibold mb-3">Support</h5>
                        <ul className="list-unstyled text-secondary">
                            <li><a href="#" className="text-secondary text-decoration-none hover-link">Help Center</a></li>
                            <li><a href="#" className="text-secondary text-decoration-none hover-link">Contact Us</a></li>
                            <li><a href="#" className="text-secondary text-decoration-none hover-link">API Docs</a></li>
                            <li><a href="#" className="text-secondary text-decoration-none hover-link">Status</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-top border-secondary mt-5 pt-4 text-center text-secondary">
                    <p className="mb-0">&copy; 2024 Billify. All rights reserved.</p>
                </div>
            </div>
            <style>{`
                .hover-link:hover {
                    color: #fff !important;
                    transition: color 0.2s;
                }
            `}</style>
        </footer>
    );
};

export default Footer;