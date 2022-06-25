const AdminDashboardContent = () => {
    return (
        <>
            <h2 className="add-margin-top">Admin dashboard</h2> <br />

            {/* <div className="row gx-5">
                <div className="col-xxl-3 col-md-6 mb-5">
                    <div className="card card-raised border-start border-primary border-4">
                        <div className="card-body px-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="me-2">
                                    <div className="display-5">101.1K</div>
                                    <div className="card-text">Downloads</div>
                                </div>
                                <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"/>
  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
</svg></div>
                            </div>
                            <div className="card-text">
                                <div className="d-inline-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-up text-success" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
</svg>
                                    <div className="caption text-success fw-500 me-2">3%</div>
                                    <div className="caption">from last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-md-6 mb-5">
                    <div className="card card-raised border-start border-warning border-4">
                        <div className="card-body px-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="me-2">
                                    <div className="display-5">12.2K</div>
                                    <div className="card-text">Purchases</div>
                                </div>
                                <div className="icon-circle bg-warning text-white"><i className="material-icons">storefront</i></div>
                            </div>
                            <div className="card-text">
                                <div className="d-inline-flex align-items-center">
                                    <i className="material-icons icon-xs text-success">arrow_upward</i>
                                    <div className="caption text-success fw-500 me-2">3%</div>
                                    <div className="caption">from last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-md-6 mb-5">
                    <div className="card card-raised border-start border-secondary border-4">
                        <div className="card-body px-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="me-2">
                                    <div className="display-5">5.3K</div>
                                    <div className="card-text">Customers</div>
                                </div>
                                <div className="icon-circle bg-secondary text-white"><i className="material-icons">people</i></div>
                            </div>
                            <div className="card-text">
                                <div className="d-inline-flex align-items-center">
                                    <i className="material-icons icon-xs text-success">arrow_upward</i>
                                    <div className="caption text-success fw-500 me-2">3%</div>
                                    <div className="caption">from last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-md-6 mb-5">
                    <div className="card card-raised border-start border-info border-4">
                        <div className="card-body px-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="me-2">
                                    <div className="display-5">7</div>
                                    <div className="card-text">Channels</div>
                                </div>
                                <div className="icon-circle bg-info text-white"><i className="material-icons">devices</i></div>
                            </div>
                            <div className="card-text">
                                <div className="d-inline-flex align-items-center">
                                    <i className="material-icons icon-xs text-success">arrow_upward</i>
                                    <div className="caption text-success fw-500 me-2">3%</div>
                                    <div className="caption">from last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}






            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-info">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">Total Orders</p>
                                    <h4 className="my-1 text-info">4805</h4>
                                    <p className="mb-0 font-13">+2.5% from last week</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z" />
                                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                </svg>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-danger">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">Total Revenue</p>
                                    <h4 className="my-1 text-danger">$84,245</h4>
                                    <p className="mb-0 font-13">+5.4% from last week</p>
                                </div>
                                <div className="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto"><i className="bx bxs-wallet"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-success">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">Bounce Rate</p>
                                    <h4 className="my-1 text-success">34.6%</h4>
                                    <p className="mb-0 font-13">-4.5% from last week</p>
                                </div>
                                <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto"><i className="bx bxs-bar-chart-alt-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card radius-10 border-start border-0 border-3 border-warning">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div>
                                    <p className="mb-0 text-secondary">Total Customers</p>
                                    <h4 className="my-1 text-warning">8.4K</h4>
                                    <p className="mb-0 font-13">+8.4% from last week</p>
                                </div>
                                <div className="widgets-icons-2 rounded-circle bg-gradient-blooker text-white ms-auto"><i className="bx bxs-group"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}

export default AdminDashboardContent;