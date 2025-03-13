import iconUpload from "@/assets/images/icon-upload.svg";
import iconInfo from "@/assets/images/icon-info.svg";
import iconErrorInfo from "@/assets/images/icon-error-info.svg";
import { ChangeEvent, useState } from "react";
import { hashUserName, regexEmail } from "@/helpers/formSendInfo";
import { useSendContext } from "@/context/SendContext";

interface DataType {
  avatar: null | File;
  fullName: string;
  email: string;
  gitHubUserName: string;
}

function Form() {
  const { setGlobalState } = useSendContext();

  const [data, setData] = useState<DataType>({
    avatar: null,
    fullName: "",
    email: "",
    gitHubUserName: "",
  });
  const [errors, setErrors] = useState({
    avatar: "",
    fullName: "",
    email: "",
    gitHubUserName: "",
  });

  const [urlTempPreview, setUrlTempPreview] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.id as keyof typeof data;
    const value = e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  }

  function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length == 0) return;

    const newFile = files[0];

    if (newFile.size > 2000000)
      return setErrors({
        ...errors,
        avatar: "File too large. Please upload a photo under 500kb",
      });

    const fileReader = new FileReader();
    fileReader.readAsDataURL(newFile);
    fileReader.onload = (e) => {
      const urlTemp = e.target?.result as string;
      setUrlTempPreview(urlTemp);
      setData({
        ...data,
        avatar: newFile,
      });
    };
  }

  function handleResetAvatar() {
    setData({
      ...data,
      avatar: null,
    });
    setUrlTempPreview("");
  }

  function validateData() {
    const newErrors = { ...errors };

    if (!regexEmail.test(data.email))
      newErrors["email"] = "Please enter a valid email address.";
    else {
      newErrors["email"] = "";
    }
    if (data.fullName.trim() == "")
      newErrors["fullName"] = "Please enter a valid GitHub username";
    else {
      newErrors["fullName"] = "";
    }

    if (
      data.gitHubUserName.trim() == "" ||
      !data.gitHubUserName.startsWith("@")
    )
      newErrors["gitHubUserName"] = "Please enter a valid GitHub username";
    else {
      newErrors["gitHubUserName"] = "";
    }

    if (data.avatar == null) newErrors["avatar"] = "Please upload your avatar";
    else {
      newErrors["avatar"] = "";
    }

    if (Object.values(newErrors).every(err => err.trim() != "")) {
      setErrors(newErrors);
      return false;
    }
    setErrors({
      avatar: "",
      fullName: "",
      email: "",
      gitHubUserName: "",
    })
    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateData()) return;
    // Submit form here
    const dataToTicket = {
      ...data,
      avatarUrl: urlTempPreview,
      tickect: hashUserName(data.gitHubUserName),
    };

    setGlobalState({
      success: true,
      userInfo: dataToTicket,
    });
  }
  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 relative max-w-md mx-auto"
      >
        {/* Avatar */}
        <div>
          <span className="font-semibold">Uploadd Avatar</span>
          {/* Input upload avatar */}
          <div className="relative border border-dashed bg-neutral-7/50  h-[120px] grid place-content-center w-full mt-3 rounded-xl hover:outline ">
            {urlTempPreview ? (
              <div className="flex flex-col gap-3 items-center text-center p-2">
                <figure className="border-y border-neutral-5 rounded-xl bg-neutral-5/40 overflow-hidden w-10 shadow-2xl">
                  <img
                    src={urlTempPreview}
                    className="aspect-square object-cover"
                    alt="preview avatar"
                  />
                </figure>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResetAvatar();
                    }}
                    className="p-1 text-[10px] underline bg-neutral-5/50 tracking-wider rounded
                    z-50 relative
                    "
                  >
                    Remove image
                  </button>
                  <button
                    type="button"
                    className="p-1 text-[10px] underline bg-neutral-5/50 tracking-wider rounded"
                  >
                    Change image
                    <input
                      onChange={handleChangeAvatar}
                      type="file"
                      className=" file:hidden absolute inset-0 opacity-0 cursor-pointer "
                    />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 items-center text-center p-2 ">
                  <figure className="border-y border-neutral-5 rounded-xl bg-neutral-5/40 p-2 shadow-2xl">
                    <img src={iconUpload} alt="icon upload" width={28} />
                  </figure>
                  <p>Drag and drop o click to upload</p>
                </div>
                <input
                  type="file"
                  onChange={handleChangeAvatar}
                  name="avatar"
                  accept="image/*"
                  id="avatar"
                  disabled={urlTempPreview.length != 0}
                  className=" file:hidden absolute inset-0 opacity-0 cursor-pointer "
                />
              </>
            )}
          </div>

          <div className="flex flex-nowrap gap-2 mt-3 ">
            {" "}
            <img
              src={errors.avatar ? iconErrorInfo : iconInfo}
              alt="icon info"
            />{" "}
            {errors.avatar ? (
              <small className="text-orange-5">{errors.avatar}</small>
            ) : (
              <small>Upload your photo (JPG o PNG, max size: 2MB)</small>
            )}
          </div>
        </div>

        {/* Full Name */}
        <label htmlFor="fullName" className="flex flex-col gap-3">
          <span className="font-semibold block">Full Name</span>
          <input
            type="text"
            id="fullName"
            className="w-full p-3 rounded-lg border-neutral-3 border bg-neutral-7/50 focus:outline-4 focus:outline-neutral-3 "
            onChange={handleChange}
            value={data.fullName}
          />
          {errors.fullName && (
            <div className="flex items-center gap-2">
              <img src={iconErrorInfo} alt="icon info" />{" "}
              <small className="text-orange-5">{errors.fullName}</small>
            </div>
          )}
        </label>

        {/* email address */}
        <label htmlFor="email" className="flex flex-col gap-3">
          <span className="font-semibold block">Email Address</span>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="w-full p-3 rounded-lg border-neutral-3 border bg-neutral-7/50 focus:outline-4 focus:outline-neutral-3 placeholder:text-neutral-5"
            onChange={handleChange}
            value={data.email}
          />
          {errors.email && (
            <div className="flex items-center gap-2">
              <img src={iconErrorInfo} alt="icon info" />
              <small className="text-orange-5">{errors.email}</small>
            </div>
          )}
        </label>

        {/* git hub user name */}
        <label htmlFor="gitHubUserName" className="flex flex-col gap-3">
          <span className="font-semibold block">GitHub Username</span>
          <input
            id="gitHubUserName"
            type="text"
            placeholder="@yourusername"
            className="w-full p-3 rounded-lg border-neutral-3 border bg-neutral-7/50 focus:outline-4 focus:outline-neutral-3 placeholder:text-neutral-5"
            onChange={handleChange}
            value={data.gitHubUserName}
          />
          {errors.gitHubUserName && (
            <div className="flex items-center gap-2">
              <img src={iconErrorInfo} alt="icon info" />{" "}
              <small className="text-orange-5">{errors.gitHubUserName}</small>
            </div>
          )}
        </label>

        <button className="p-3 w-full bg-orange-5 rounded-xl text-neutral-9 font-bold text-lg hover:outline hover:outline-2 hover:outline-neutral-3 transition-all">
          Generate My Ticket
        </button>
      </form>
    </div>
  );
}

export { Form };
