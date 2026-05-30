import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg) {
      return toast.error("Please upload doctor image");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { atoken: aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-4 sm:m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-4 sm:px-8 py-6 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Image upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <div className="relative w-20 h-20">
              <img
                className="w-20 h-20 bg-gray-100 rounded-full object-cover"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
              {!docImg && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-gray-400 text-center leading-tight">
                    Upload
                  </span>
                </div>
              )}
            </div>
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10 text-gray-600">
          {/* Left column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                className="border rounded px-3 py-2 focus:outline-primary"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border rounded px-3 py-2 focus:outline-primary"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border rounded px-3 py-2 focus:outline-primary"
                type="password"
                placeholder="Password (min 8 chars)"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                minLength={8}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                className="border rounded px-3 py-2 focus:outline-primary"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees (₹)</p>
              <input
                className="border rounded px-3 py-2 focus:outline-primary"
                type="number"
                placeholder="Consultation fees"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                required
                min={0}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                className="border rounded px-3 py-2 focus:outline-primary"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education / Degree</p>
              <input
                className="border rounded px-3 py-2 focus:outline-primary"
                type="text"
                placeholder="e.g. MBBS, MD"
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border rounded px-3 py-2 focus:outline-primary"
                type="text"
                placeholder="Address Line 1"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                required
              />
              <input
                className="border rounded px-3 py-2 mt-1 focus:outline-primary"
                type="text"
                placeholder="Address Line 2"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            className="w-full px-4 pt-2 border rounded focus:outline-primary"
            placeholder="Write about doctor's expertise, qualifications..."
            rows={5}
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Adding Doctor..." : "Add Doctor"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
