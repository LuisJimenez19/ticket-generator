import iconUpload from "@/assets/images/icon-upload.svg";
import iconInfo from "@/assets/images/icon-info.svg";
import { ChangeEvent, useState } from "react";

interface DataType {
  avatar: null | File;
  fullName: string;
  email: string;
  gitHubUserName: string;
}

function Form() {
  const [data, setData] = useState<DataType>({
    avatar: null,
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
    console.log(newFile);
    if (!newFile.type.includes("image")) return alert("Debe ser una imagen");
    if (newFile.size > 2000000)
      return alert("La imagen es muy pesada debe ser de 2MB o menos.");

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
  return (
    <div className="relative">
      <form className="flex flex-col gap-6 relative max-w-md mx-auto">
        {/* Avatar */}
        <div >
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
                    <input onChange={handleChangeAvatar} type="file" className=" file:hidden absolute inset-0 opacity-0 cursor-pointer " />
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
                  accept=".jpg, .png"
                  id="avatar"
                  disabled={urlTempPreview.length != 0}
                  className=" file:hidden absolute inset-0 opacity-0 cursor-pointer "
                />
              </>
            )}
          </div>

          <div className="flex flex-nowrap gap-2 mt-3 ">
            {" "}
            <img src={iconInfo} alt="" />{" "}
            <small>Upload your photo (JPG o PNG, max size: 2MB)</small>
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
        </label>

        <button className="p-3 w-full bg-orange-5 rounded-xl text-neutral-9 font-bold text-lg hover:outline hover:outline-2 hover:outline-neutral-3 transition-all">
          Generate My Ticket
        </button>
      </form>
    </div>
  );
}

export { Form };
