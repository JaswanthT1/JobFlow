import { useEffect, useState } from "react";
import Login from "./Login";
import "./App.css";

function App() {

  const [loggedIn, setLoggedIn] = useState(
  !!localStorage.getItem("access_token")
);

const [activePage, setActivePage] = useState("overview");
const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

const [applications, setApplications] = useState([]);
const [loading, setLoading] = useState(true);

const [showForm, setShowForm] = useState(false);
const [editingApplication, setEditingApplication] = useState(null);

const [formData, setFormData] = useState({
  company: "",
  position: "",
  salary: "",
  status: "Applied",
  application_date: "",
});

useEffect(() => {
  if (!loggedIn) return;

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
         "http://127.0.0.1:8000/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load applications");
      }

      const data = await response.json();

      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchApplications();
}, [loggedIn]);

const handleAddApplication = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      "http://127.0.0.1:8000/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: formData.company,
          position: formData.position,
          salary: formData.salary
            ? Number(formData.salary)
            : null,
          status: formData.status,
          application_date: formData.application_date,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to create application");
    }

    setApplications((previous) => [
      data,
      ...previous,
    ]);

    setFormData({
      company: "",
      position: "",
      salary: "",
      status: "Applied",
      application_date: "",
    });

    setShowForm(false);

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const handleEditApplication = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      `http://127.0.0.1:8000/applications/${editingApplication.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: formData.company,
          position: formData.position,
          salary: formData.salary
            ? Number(formData.salary)
            : null,
          status: formData.status,
          application_date: formData.application_date,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to update application");
    }

    setApplications((previous) =>
      previous.map((application) =>
        application.id === data.id ? data : application
      )
    );

    setEditingApplication(null);

    setFormData({
      company: "",
      position: "",
      salary: "",
      status: "Applied",
      application_date: "",
    });

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
const handleDeleteApplication = async (id) => {
  if (!window.confirm("Delete this application?")) {
    return;
  }
  const handleLogout = () => {
  localStorage.removeItem("access_token");
  setLoggedIn(false);
  setApplications([]);
  setActivePage("overview");
};

  try {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
      `http://127.0.0.1:8000/applications/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to delete application");
    }

    setApplications((previous) =>
      previous.filter((application) => application.id !== id)
    );

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


  const handleLogout = () => {
  localStorage.removeItem("access_token");
  setLoggedIn(false);
  setApplications([]);
  setActivePage("overview");
};



if (!loggedIn) {
  return <Login onLogin={() => setLoggedIn(true)} />;
}
  const stats = [
  {
    label: "Applications",
    value: applications.length,
    description: "Total applications",
  },
  {
    label: "Interviews",
    value: applications.filter(
      (application) => application.status === "Interview"
    ).length,
    description: "Active opportunities",
  },
  {
    label: "Offers",
    value: applications.filter(
      (application) => application.status === "Offer"
    ).length,
    description: "Offers received",
  },
];


  const filteredApplications = applications.filter((application) => {
  const matchesSearch =
    application.company
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    application.position
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    application.status === statusFilter;

  const matchesPage =
    activePage !== "interviews" ||
    application.status === "Interview";

  return matchesSearch && matchesStatus && matchesPage;
});
  
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">J</div>
          <span>JobFlow</span>
        </div>

            <nav className="nav">

        <button
          className={`nav-item ${
            activePage === "overview" ? "active" : ""
          }`}
          onClick={() => setActivePage("overview")}
        >
          <span>⌂</span>
          Overview
        </button>

        <button
          className={`nav-item ${
            activePage === "applications" ? "active" : ""
          }`}
          onClick={() => setActivePage("applications")}
        >
          <span>▣</span>
          Applications
        </button>

        <button
          className={`nav-item ${
            activePage === "interviews" ? "active" : ""
          }`}
          onClick={() => setActivePage("interviews")}
        >
          <span>◷</span>
          Interviews
        </button>

      </nav>

        <div className="sidebar-bottom">
          <div className="user-card">
     
            <div className="avatar">J</div>
            <div>
              <strong>Jaswanth</strong>
              <small>Job seeker</small>
            </div>
          </div>

           <button
          className="logout-button"
          onClick={handleLogout}
          >
          Log out
      </button>

        </div>
      </aside>

<main className="main">

  {/* ADD / EDIT FORM */}
  {showForm && (
    <section className="add-application-form">
      <div className="section-header">
        <div>
          <h2>
            {editingApplication
              ? "Edit application"
              : "Add application"}
          </h2>

          <p>
            {editingApplication
              ? "Update your job opportunity."
              : "Track a new job opportunity."}
          </p>
        </div>

        <button
          className="view-button"
          onClick={() => {
            setShowForm(false);
            setEditingApplication(null);
          }}
        >
          Cancel
        </button>
      </div>

      <form
        onSubmit={
          editingApplication
            ? handleEditApplication
            : handleAddApplication
        }
      >

        <input
          placeholder="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData({
              ...formData,
              company: e.target.value,
            })
          }
          required
        />

        <input
          placeholder="Position"
          value={formData.position}
          onChange={(e) =>
            setFormData({
              ...formData,
              position: e.target.value,
            })
          }
          required
        />

        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) =>
            setFormData({
              ...formData,
              salary: e.target.value,
            })
          }
        />

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <input
          type="date"
          value={formData.application_date}
          onChange={(e) =>
            setFormData({
              ...formData,
              application_date: e.target.value,
            })
          }
          required
        />

        <button
          type="submit"
          className="add-button"
        >
          {editingApplication
            ? "Save changes"
            : "Save application"}
        </button>

      </form>
    </section>
  )}

  {/* APPLICATIONS / OVERVIEW */}
  {activePage === "applications" ? (

    <section className="applications-page">

      <div className="topbar">
        <div>
          <p className="eyebrow">APPLICATIONS</p>

          <h1>Your applications.</h1>

          <p className="subtitle">
            Keep every opportunity organized in one place.
          </p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            setEditingApplication(null);

            setFormData({
              company: "",
              position: "",
              salary: "",
              status: "Applied",
              application_date: "",
            });

            setShowForm(true);
          }}
        >
          + Add application
        </button>
      </div>

      <div className="application-list">

        <div className="application-header">
          <span>Company</span>
          <span>Position</span>
          <span>Status</span>
          <span>Applied</span>
          <span>Salary</span>
          <span>Actions</span>
        </div>

        {applications.map((application) => (

          <div
            className="application-row"
            key={application.id}
          >

            <div className="company-cell">
              <div className="company-icon">
                {application.company.charAt(0)}
              </div>

              <strong>
                {application.company}
              </strong>
            </div>

            <div className="position-cell">
              {application.position}
            </div>

            <div>
              <span
                className={`status ${application.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {application.status}
              </span>
            </div>

            <div className="application-date">
              {application.application_date}
            </div>

            <div className="salary-cell">
              {application.salary
                ? `₹${Number(
                    application.salary
                  ).toLocaleString("en-IN")}`
                : "—"}
            </div>

            <div className="application-actions">

              <button
                type="button"
                className="edit-button"
                onClick={() => {

                  setEditingApplication(application);

                  setFormData({
                    company: application.company,
                    position: application.position,
                    salary: application.salary ?? "",
                    status: application.status,
                    application_date:
                      application.application_date,
                  });

                  setShowForm(true);
                }}
              >
                Edit
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={() =>
                  handleDeleteApplication(
                    application.id
                  )
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  ) : (

    <>
      {/* OVERVIEW */}

      <header className="topbar">

        <div>
              <p className="eyebrow">
          {activePage === "interviews"
            ? "INTERVIEWS"
            : "OVERVIEW"}
        </p>

                <h1>
        {activePage === "interviews"
          ? "Your interviews."
          : <>Your job search, <span>in one place.</span></>}
      </h1>
       <p className="subtitle">
  {activePage === "interviews"
    ? "Keep track of your active interview opportunities."
    : "Track applications, interviews and offers without the chaos."}
</p>

        </div>

        <div className="topbar-actions">

          <input
            className="search"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            className="add-button"
            onClick={() => {
              setEditingApplication(null);

              setFormData({
                company: "",
                position: "",
                salary: "",
                status: "Applied",
                application_date: "",
              });

              setShowForm(true);
            }}
          >
            + Add application
          </button>

        </div>

      </header>

      {activePage === "applications" && (
  <div className="filters">
  {["All", "Applied", "Interview", "Offer", "Rejected"].map(
    (status) => (
      <button
        key={status}
        className={`filter-button ${
          statusFilter === status ? "active" : ""
        }`}
        onClick={() => setStatusFilter(status)}
      >
        {status}
      </button>
    )
  )}
  </div>
)}

      {/* STATS */}

      <section className="stats">

        {stats.map((stat) => (

          <div
            className="stat-card"
            key={stat.label}
          >

            <div className="stat-top">
              <span>{stat.label}</span>
              <span className="stat-dot" />
            </div>

            <strong>
              {stat.value}
            </strong>

            <small>
              {stat.description}
            </small>

          </div>

        ))}

      </section>

      {/* RECENT APPLICATIONS */}

      <section className="applications-section">

        <div className="section-header">

          <div>
            <h2>
              Recent applications
            </h2>

            <p>
              Your latest job opportunities
            </p>
          </div>

          <button
            className="view-button"
            onClick={() =>
              setActivePage("applications")
            }
          >
            View all →
          </button>

        </div>

        <div className="application-list">

          <div className="application-header">
            <span>Company</span>
            <span>Position</span>
            <span>Status</span>
            <span>Applied</span>
            <span>Salary</span>
          </div>

          {filteredApplications.map(
            (application) => (

              <div
                className="application-row"
                key={application.id}
              >

                <div className="company-cell">

                  <div className="company-icon">
                    {application.company.charAt(0)}
                  </div>

                  <strong>
                    {application.company}
                  </strong>

                </div>

                <div className="position-cell">
                  {application.position}
                </div>

                <div>

                  <span
                    className={`status ${application.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {application.status}
                  </span>

                </div>

                <div className="application-date">
                  {application.application_date}
                </div>

                <div className="salary-cell">

                  {application.salary
                    ? `₹${Number(
                        application.salary
                      ).toLocaleString("en-IN")}`
                    : "—"}

                </div>

              </div>

            )
          )}

        </div>

      </section>

    </>

  )}

</main>
    </div>
  );
}

export default App;