import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from 'next/link';


export default function AddSchool() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);


  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    });
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(result.error || "❌ Failed to add school");
        setIsError(true);
        return;
      }

      setMessage("✅ School added successfully!");
      setIsError(false);
      reset();
    } catch (err) {
      setMessage("❌ Something went wrong");
      setIsError(true);
    }
  };

  return (

    // <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
    <div style={{ maxWidth: "600px", width: "90%", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>

      {/* Form Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>Add School</h1>
        <Link href="/showSchools">
          <button
            style={{
              padding: "8px 12px",
              minWidth: "100px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View Schools
          </button>
        </Link>
      </div>
      {message && (
        <p style={{ color: isError ? "red" : "green", fontWeight: "bold" }}>
          {message}
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
        encType="multipart/form-data"
      >
        {/* Name */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>School Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Address</label>
          <input
            {...register("address", { required: "Address is required" })}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          {errors.address && <p style={{ color: "red" }}>{errors.address.message}</p>}
        </div>

        {/* City */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>City</label>
          <input
            {...register("city", { required: "City is required" })}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          {errors.city && <p style={{ color: "red" }}>{errors.city.message}</p>}
        </div>

        {/* State */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>State</label>
          <input
            {...register("state", { required: "State is required" })}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          {errors.state && <p style={{ color: "red" }}>{errors.state.message}</p>}
        </div>

        {/* Contact */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Contact</label>
          <input
            type="text"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Contact number must be digits only",
              },
              minLength: {
                value: 10,
                message: "Contact number must be at least 10 digits",
              },
            })}
          />
          {errors.contact && <p style={{ color: "red" }}>{errors.contact.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            type="email"
            {...register("email_id", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
          {errors.email_id && <p style={{ color: "red" }}>{errors.email_id.message}</p>}
        </div>

        {/* Image */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Upload School Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "School image is required",
              validate: {
                checkFileType: (files) => {
                  if (!files || files.length === 0) return "File is required";
                  const file = files[0];
                  const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
                  return validTypes.includes(file.type) || "Only image files are allowed";
                },
                checkFileSize: (files) => {
                  if (!files || files.length === 0) return "File is required";
                  const file = files[0];
                  return file.size <= 20 * 1024 * 1024 || "File size must be less than 20MB";
                },
              },
            })}
          />
          {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            minWidth: "100px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      {message && (
        <p style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}
