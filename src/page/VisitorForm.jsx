import React, { useState } from "react";
import logo from "../assets/logo/logo3.png";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    visitorProfile: "",
    visitorProfileOther: "",
    companyName: "",
    contactPerson: "",
    designation: "",
    mobileNumber: "",
    address: "",
    email: "",
    website: "",
    personalInsta: "",
    firmInsta: "",
    personalLinkedin: "",
    firmLinkedin: "",
    projectLocation: "",
    expectedStartDate: "",
    projectSize: "",
    projects2026: [""],
    preferredSuppliers: "",
    challenges: "",
    vision: "",
    projectTypes: [],
    structuralSpectrum: [],
    prestigePanache: [],
    greenZone: [],
    eventDay: "Day1",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleProjectsChange = (index, value) => {
    const updatedProjects = [...formData.projects2026];
    updatedProjects[index] = value;
    setFormData({ ...formData, projects2026: updatedProjects });
  };

  const handleProjectTypesChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      let updatedProjectTypes = [...prevFormData.projectTypes];

      if (checked) {
        updatedProjectTypes.push(value);
      } else {
        updatedProjectTypes = updatedProjectTypes.filter(
          (type) => type !== value
        );
      }

      return { ...prevFormData, projectTypes: updatedProjectTypes };
    });
  };

  const handleStructuralSpectrumChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      let updatedStructuralSpectrum = [...prevFormData.structuralSpectrum];

      if (checked) {
        updatedStructuralSpectrum.push(value);
      } else {
        updatedStructuralSpectrum = updatedStructuralSpectrum.filter(
          (type) => type !== value
        );
      }
      return { ...prevFormData, structuralSpectrum: updatedStructuralSpectrum };
    });
  };

  const handlePrestigePanacheChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      let updatedPrestigePanache = [...prevFormData.prestigePanache];

      if (checked) {
        updatedPrestigePanache.push(value);
      } else {
        updatedPrestigePanache = updatedPrestigePanache.filter(
          (item) => item !== value
        );
      }

      return { ...prevFormData, prestigePanache: updatedPrestigePanache };
    });
  };

  const handleGreenZoneChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      let updatedGreenZone = [...prevFormData.greenZone];

      if (checked) {
        updatedGreenZone.push(value);
      } else {
        updatedGreenZone = updatedGreenZone.filter((type) => type !== value);
      }

      return { ...prevFormData, greenZone: updatedGreenZone };
    });
  };

  const addProjectField = () => {
    setFormData({
      ...formData,
      projects2026: [...formData.projects2026, ""],
    });
  };

  // remove project input
  const removeProjectField = (index) => {
    const updatedProjects = [...formData.projects2026];
    updatedProjects.splice(index, 1); // remove 1 element at index
    setFormData({ ...formData, projects2026: updatedProjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);
    // --- Validation ---
    const mobileRegex = /^[6-9]\d{9}$/; // Indian 10-digit mobile numbers starting 6–9
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const email = formData.email.trim();

    if (!mobileRegex.test(formData.mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "projects2026") {
        formData.projects2026.forEach((proj) =>
          data.append("projects2026", proj)
        );
      } else {
        data.append(key, formData[key]);
      }
    });

    if (image) {
      data.append("image", image);
    }

    // https://artiststation.co.in/navig8-hydb-api/api/form/submit
    //http://localhost:5000/api/form/submit
    try {
      const res = await fetch(
        "https://artiststation.co.in/navig8-hydb-api/api/form/submit",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert(result.message || "Form submitted successfully!");
        setTimeout(() => {
          navigate("/success");
        }, 1500);

        setFormData({
          visitorProfile: "",
          visitorProfileOther: "",
          companyName: "",
          contactPerson: "",
          designation: "",
          mobileNumber: "",
          address: "",
          email: "",
          website: "",
          personalInsta: "",
          firmInsta: "",
          personalLinkedin: "",
          firmLinkedin: "",
          projectLocation: "",
          expectedStartDate: "",
          projectSize: "",
          projects2026: [""],
          preferredSuppliers: "",
          challenges: "",
          vision: "",
          projectTypes: [],
          structuralSpectrum: [],
          prestigePanache: [],
          greenZone: [],
        });
      } else {
        alert(result.error || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="container py-4">
      <img
        src={logo}
        alt="Logo"
        className="img-fluid mb-3 rounded top-logo"
        // style={{ width: "100%", objectFit: "cover" }}
      />
      <h2 className="text-center text-uppercase fw-bold mb-1 form-heading-color">
        Navig8 Vision Directory Details
      </h2>
      <h2 className="text-center text-uppercase fw-bold mb-4 form-heading-color">(DAY 1)</h2>

      <h5 className="text-center fw-bold form-heading-color">
        Date: September, 2025 | Venue: Hyderabad
      </h5>

      <h6 className="imp-inst-heading">Important Instructions Before You Begin :</h6>
      <ul>
        <li>Please enter the details of the person attending the show.</li>
        <li><strong>Preferred attendee</strong> - Principal Architect/ Principal Interior Designer/ Product Specifier or Specifier</li>
        <li>
          The directory will be shared with participating brands prior to the
          show, allowing them to better understand your work and reach out
          meaningfully.
        </li>
        <li>
          Directory will be shared with key government bodies including Urban
          Development, Airports, Railways, Metro and other relevant
          infrastructure authorities.
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-bold label-text">
            Visitor Profile :
          </label>
          <select
            className="form-select "
            name="visitorProfile"
            value={formData.visitorProfile}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option>Principal Architects</option>
            <option>Principal Interior Designers</option>
            <option>Government Officials</option>
            <option>International Buyers</option>
            <option>Other</option>
          </select>
        </div>

        {formData.visitorProfile === "Other" && (
          <div className="col-md-6">
            <label className="form-label fw-bold">Other... :</label>
            <input
              type="text"
              className="form-control"
              name="visitorProfileOther"
              value={formData.visitorProfileOther}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="col-md-6">
          <label className="form-label fw-bold">
            Upload Visitor's Picture :
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <h4 className="fw-bold form-heading-color"> COMPANY DETAILS </h4>

        <div className="col-md-6">
          <label className="form-label fw-bold">Company Name :</label>
          <input
            type="text"
            className="form-control"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Contact Person<span className="text-danger">*</span> :</label>
          <input
            type="text"
            className="form-control"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Contact Person"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Designation<span className="text-danger">*</span> :</label>
          <input
            type="text"
            className="form-control"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Mobile Number<span className="text-danger">*</span> :</label>
          <input
            type="text"
            className="form-control"
            name="mobileNumber"
            maxLength={10}
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-bold">Address :</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Email<span className="text-danger">*</span> :</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Website :</label>
          <input
            type="text"
            className="form-control"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Copy Paste Link Here"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Personal Instagram :</label>
          <input
            type="text"
            className="form-control"
            name="personalInsta"
            value={formData.personalInsta}
            onChange={handleChange}
            placeholder="Copy Paste Link Here"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Company Instagram :</label>
          <input
            type="text"
            className="form-control"
            name="firmInsta"
            value={formData.firmInsta}
            onChange={handleChange}
            placeholder="Copy Paste Link Here"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Personal LinkedIn :</label>
          <input
            type="text"
            className="form-control"
            name="personalLinkedin"
            value={formData.personalLinkedin}
            onChange={handleChange}
            placeholder="Copy Paste Link Here"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Company LinkedIn :</label>
          <input
            type="text"
            className="form-control"
            name="firmLinkedin"
            value={formData.firmLinkedin}
            onChange={handleChange}
            placeholder="Copy Paste Link Here"
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-bold">
            Types of Projects You Work On :
          </label>
          <div className="d-flex flex-wrap gap-3">
            {[
              "Commercial ",
              "Hospitality",
              "Industrial",
              "Institutional",
              "Residential",
              "Experiential Spaces",
            ].map((type) => (
              <div key={type} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={type}
                  id={`project-type-${type}`}
                  name="projectTypes"
                  checked={formData.projectTypes.includes(type)}
                  onChange={handleProjectTypesChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`project-type-${type}`}
                >
                  {type}
                </label>
              </div>
            ))}

            <div className="form-check">
              <label
                className="form-check-label fw-bold"
                htmlFor="project-type-other"
              >
                Other...
              </label>
              <input
                type="text"
                className="form-control d-inline w-auto"
                value={
                  formData.projectTypes.find(
                    (t) =>
                      ![
                        "Commercial ",
                        "Hospitality",
                        "Industrial",
                        "Institutional",
                        "Residential",
                        "Experiential Spaces",
                      ].includes(t)
                  ) || ""
                }
                onChange={(e) => {
                  const updatedOthers = formData.projectTypes.filter((t) =>
                    [
                      "Commercial ",
                      "Hospitality",
                      "Industrial",
                      "Institutional",
                      "Residential",
                      "Experiential Spaces",
                    ].includes(t)
                  );
                  if (e.target.value) {
                    updatedOthers.push(e.target.value);
                  }
                  setFormData({ ...formData, projectTypes: updatedOthers });
                }}
                placeholder="Specify"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Project Location :</label>
          <input
            type="text"
            className="form-control"
            name="projectLocation"
            value={formData.projectLocation}
            onChange={handleChange}
            placeholder="Project Location"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Expected Start Date :</label>
          <input
            type="date"
            className="form-control"
            name="expectedStartDate"
            value={formData.expectedStartDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-bold">Project Size :</label>
          <input
            type="text"
            className="form-control"
            name="projectSize"
            value={formData.projectSize}
            onChange={handleChange}
            placeholder="Project Size"
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-bold">Projects 2026 :</label>
          {formData.projects2026.map((project, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control me-2"
                value={project}
                onChange={(e) => handleProjectsChange(index, e.target.value)}
                placeholder="Projects 2026"
              />
              {index === formData.projects2026.length - 1 && (
                <button
                  type="button"
                  className="btn btn-success mx-1"
                  onClick={addProjectField}
                >
                  +
                </button>
              )}
              {/* Show remove button if more than 1 field */}
              {formData.projects2026.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger mx-1"
                  onClick={() => removeProjectField(index)}
                >
                  -
                </button>
              )}
            </div>
          ))}
        </div>

        <h4 className="fw-bold form-heading-color"> PRODUCT CATEGORIES OF INTEREST </h4>
        <div className="col-12 ms-3">
          <label className="form-label fw-bold">
            The Structural Spectrum :
          </label>
          {/* <div className="d-flex flex-wrap gap-3"> */}
          <div className="row">
            {[
              "Cement",
              "Ready Mix Concrete",
              "Bricks and Blocks",
              "Structural Steel",
              "TMT Bars",
              "Roofing Solutions",
              "Waterproofing Chemicals and Adhesives",
              "Paints and Coatings",
              "Elevator",
              "Facade",
              "Formwork",
              "PEB Structure",
              "Glass Facade",
              "Plumbing and Pipes",
            ].map((spectrum) => (
              // <div key={spectrum} className="form-check">
              <div key={spectrum} className="col-md-4 col-sm-6 form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={spectrum}
                  id={`spectrum-${spectrum.replace(/\s/g, "-")}`}
                  name="structuralSpectrum"
                  checked={formData.structuralSpectrum.includes(spectrum)}
                  onChange={handleStructuralSpectrumChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`spectrum-${spectrum.replace(/\s/g, "-")}`}
                >
                  {spectrum}
                </label>
              </div>
            ))}

            {/* ✅ Other Option */}
            {/* <div className="form-check">
              <label
                className="form-check-label fw-bold"
                htmlFor="spectrum-other"
              > */}
            <div className="col-md-4 col-sm-6 d-flex align-items-center mb-2">
              <label
                className="form-check-label fw-bold me-2"
                htmlFor="spectrum-other"
              >
                Other...
              </label>
              <input
                type="text"
                // className="form-control d-inline w-auto"
                className="form-control"
                value={
                  formData.structuralSpectrum.find(
                    (s) =>
                      ![
                        "Cement",
                        "Ready Mix Concrete",
                        "Bricks and Blocks",
                        "Structural Steel",
                        "TMT Bars",
                        "Roofing Solutions",
                        "Waterproofing Chemicals and Adhesives",
                        "Paints and Coatings",
                        "Elevator",
                        "Facade",
                        "Formwork",
                        "PEB Structure",
                        "Glass Facade",
                        "Plumbing and Pipes",
                      ].includes(s)
                  ) || ""
                }
                onChange={(e) => {
                  const predefined = [
                    "Cement",
                    "Ready Mix Concrete",
                    "Bricks and Blocks",
                    "Structural Steel",
                    "TMT Bars",
                    "Roofing Solutions",
                    "Waterproofing Chemicals and Adhesives",
                    "Paints and Coatings",
                    "Elevator",
                    "Facade",
                    "Formwork",
                    "PEB Structure",
                    "Glass Facade",
                    "Plumbing and Pipes",
                  ];

                  const updatedOthers = formData.structuralSpectrum.filter(
                    (s) => predefined.includes(s)
                  );

                  if (e.target.value) {
                    updatedOthers.push(e.target.value);
                  }

                  setFormData({
                    ...formData,
                    structuralSpectrum: updatedOthers,
                  });
                }}
                placeholder="Specify"
              />
            </div>
          </div>
        </div>

        <div className="col-12 ms-3">
          <label className="form-label fw-bold">Prestige & Panache :</label>
          {/* <div className="d-flex flex-wrap gap-3"> */}
          <div className="row">
            {[
              "Marble",
              "Tiles",
              "Quartz",
              "Terrazzo",
              "Wooden Flooring",
              "Laminate",
              "Rugs and Carpet",
              "Artefacts",
              "Sculptures",
              "Decorative Cladding",
              "Stone Cladding",
              "Fencing",
              "Garden and Outdoor Furniture",
              "Kitchen Appliances",
              "Luxury Furniture",
              "Wooden Furniture",
              "Luxury Lighting",
              "Mattress",
              "Office Furniture",
              "Swimming Pools",
              "Switches and Sockets",
              "Wallpaper",
              "Wooden Doors",
              "UPVC Doors and Windows",
              "Aluminum Doors and Windows",
              "Curtain Wall Systems",
              "ACP Panels",
              "Shading and Louvers",
              "Railing and Balustrade",
              "False Ceiling",
              "Modular Kitchen and Wardrobe",
              "Hardware and Fittings",
              "Wellness",
              "Lighting",
              "Drones",
              "Pergolas and Gazebos",
            ].map((item) => (
              // <div key={item} className="form-check">
              <div key={item} className="col-md-4 col-sm-6 form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={item}
                  id={`prestige-${item.replace(/\s/g, "-")}`}
                  name="prestigePanache"
                  checked={formData.prestigePanache.includes(item)}
                  onChange={handlePrestigePanacheChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`prestige-${item.replace(/\s/g, "-")}`}
                >
                  {item}
                </label>
              </div>
            ))}

            {/* ✅ Other Option */}
            {/* <div className="form-check">
              <label
                className="form-check-label fw-bold"
                htmlFor="prestige-other"
              > */}
            <div className="col-md-4 col-sm-6 d-flex align-items-center mb-2">
              <label
                className="form-check-label fw-bold me-2"
                htmlFor="prestige-other"
              >
                Other...
              </label>
              <input
                type="text"
                // className="form-control d-inline w-auto"
                className="form-control"
                value={
                  formData.prestigePanache.find(
                    (s) =>
                      ![
                        "Marble",
                        "Tiles",
                        "Quartz",
                        "Terrazzo",
                        "Wooden Flooring",
                        "Laminate",
                        "Rugs and Carpet",
                        "Artefacts",
                        "Sculptures",
                        "Decorative Cladding",
                        "Stone Cladding",
                        "Fencing",
                        "Garden and Outdoor Furniture",
                        "Kitchen Appliances",
                        "Luxury Furniture",
                        "Wooden Furniture",
                        "Luxury Lighting",
                        "Mattress",
                        "Office Furniture",
                        "Swimming Pools",
                        "Switches and Sockets",
                        "Wallpaper",
                        "Wooden Doors",
                        "UPVC Doors and Windows",
                        "Aluminum Doors and Windows",
                        "Curtain Wall Systems",
                        "ACP Panels",
                        "Shading and Louvers",
                        "Railing and Balustrade",
                        "False Ceiling",
                        "Modular Kitchen and Wardrobe",
                        "Hardware and Fittings",
                        "Wellness",
                        "Lighting",
                        "Drones",
                        "Pergolas and Gazebos",
                      ].includes(s)
                  ) || ""
                }
                onChange={(e) => {
                  const predefined = [
                    "Marble",
                    "Tiles",
                    "Quartz",
                    "Terrazzo",
                    "Wooden Flooring",
                    "Laminate",
                    "Rugs and Carpet",
                    "Artefacts",
                    "Sculptures",
                    "Decorative Cladding",
                    "Stone Cladding",
                    "Fencing",
                    "Garden and Outdoor Furniture",
                    "Kitchen Appliances",
                    "Luxury Furniture",
                    "Wooden Furniture",
                    "Luxury Lighting",
                    "Mattress",
                    "Office Furniture",
                    "Swimming Pools",
                    "Switches and Sockets",
                    "Wallpaper",
                    "Wooden Doors",
                    "UPVC Doors and Windows",
                    "Aluminum Doors and Windows",
                    "Curtain Wall Systems",
                    "ACP Panels",
                    "Shading and Louvers",
                    "Railing and Balustrade",
                    "False Ceiling",
                    "Modular Kitchen and Wardrobe",
                    "Hardware and Fittings",
                    "Wellness",
                    "Lighting",
                    "Drones",
                    "Pergolas and Gazebos",
                  ];

                  const updatedOthers = formData.prestigePanache.filter((s) =>
                    predefined.includes(s)
                  );

                  if (e.target.value) {
                    updatedOthers.push(e.target.value);
                  }

                  setFormData({
                    ...formData,
                    prestigePanache: updatedOthers,
                  });
                }}
                placeholder="Specify"
              />
            </div>
          </div>
        </div>

        <div className="col-12 ms-3">
          <label className="form-label fw-bold">Innovation Sphere :</label>
          {/* <div className="d-flex flex-wrap gap-3"> */}
          <div className="row">
            {[
              "HVAC",
              "Electrical’s Wires",
              "Smart Automation",
              "Solar Energy",
              "Fire and Safety",
              "Water Treatment",
              "Landscape",
              "Acostic Solutions",
              "Insulation",
              "Rain Water Harvesting",
              "Waste Management",
              "3 D Print",
              "Construction",
            ].map((zone) => (
              // <div key={zone} className="form-check">
              <div key={zone} className="col-md-4 col-sm-6 form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={zone}
                  id={`zone-${zone.replace(/\s/g, "-")}`}
                  name="greenZone"
                  checked={formData.greenZone.includes(zone)}
                  onChange={handleGreenZoneChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`zone-${zone.replace(/\s/g, "-")}`}
                >
                  {zone}
                </label>
              </div>
            ))}

            {/* ✅ Other Option */}
            {/* <div className="form-check">
              <label className="form-check-label fw-bold" htmlFor="zone-other"> */}
            <div className="col-md-4 col-sm-6 d-flex align-items-center mb-2">
              <label
                className="form-check-label fw-bold me-2"
                htmlFor="zone-other"
              >
                Other...
              </label>
              <input
                type="text"
                // className="form-control d-inline w-auto"
                className="form-control"
                value={
                  formData.greenZone.find(
                    (s) =>
                      ![
                        "HVAC",
                        "Electrical’s Wires",
                        "Smart Automation",
                        "Solar Energy",
                        "Fire and Safety",
                        "Water Treatment",
                        "Landscape",
                        "Acostic Solutions",
                        "Insulation",
                        "Rain Water Harvesting",
                        "Waste Management",
                        "3 D Print",
                        "Construction",
                      ].includes(s)
                  ) || ""
                }
                onChange={(e) => {
                  const predefined = [
                    "HVAC",
                    "Electrical’s Wires",
                    "Smart Automation",
                    "Solar Energy",
                    "Fire and Safety",
                    "Water Treatment",
                    "Landscape",
                    "Acostic Solutions",
                    "Insulation",
                    "Rain Water Harvesting",
                    "Waste Management",
                    "3 D Print",
                    "Construction",
                  ];

                  const updatedOthers = formData.greenZone.filter((s) =>
                    predefined.includes(s)
                  );

                  if (e.target.value) {
                    updatedOthers.push(e.target.value);
                  }

                  setFormData({
                    ...formData,
                    greenZone: updatedOthers,
                  });
                }}
                placeholder="Specify"
              />
            </div>
          </div>
        </div>

        <div className="col-12 ">
          <label className="form-label fw-bold">
            Preferred Suppliers/Brands (if/any) :
          </label>
          <textarea
            className="form-control"
            name="preferredSuppliers"
            value={formData.preferredSuppliers}
            onChange={handleChange}
            placeholder="Preferred Suppliers/Brands"
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-bold">
            Specific Challenges or Needs in Your Projects :
          </label>
          <textarea
            className="form-control"
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            placeholder="Specific Challenges or Needs in Your Projects"
          />
        </div>

        <div className="col-12">
          <label className="form-label fw-bold">
            A Vision Towards Industry :
          </label>
          <textarea
            className="form-control"
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            placeholder="A Vision Towards Industry"
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary px-4 py-2">
            Submit
          </button>
        </div>
      </form>

      <div className="mt-2">
        <p className="text-start">
          Kindly share the completed form with us. This will help us coordinate
          with exhibitors to ensure their offerings align with your
          requirements.
        </p>
        <p className="text-start">
          We look forward to your participation and contribution to NAVIG8.
          Together, let’s drive innovation in architecture and construction.
        </p>
      </div>
    </div>
  );
};

export default UserForm;
