import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import dynamic from "next/dynamic";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Switcher from '../../components/Switcher'
import Footer from "../../components/Footer";
const Addpost = () => {
  const { quill, quillRef } = useQuill();
  const [selectedFileDocument, setSelectedFileDocument] = useState(null);
  const url = "https://arioapi.pythonanywhere.com/api/posts/";
  const [qvalue, setQvalue] = useState();
  const [data, setData] = useState({
    title: "",
    desc: "",
    img: null,
    about: "",
    date: null,
    cat_id: null,
  });
  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setQvalue(quillRef.current.firstChild.innerHTML);
      });
    }
  });
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  function submit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", selectedFileDocument);
    formData.append("title", data.title);
    formData.append("desc", qvalue);
    formData.append("about", data.about);
    formData.append("date", data.date);
    formData.append("cat_id", data.cat_id);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData({
          title: "",
          desc: "",
          img: "",
          about: "",
          date: "",
          cat_id: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="bg-[#FAFAFA] dark:bg-[#111111] h-[100vh]">
      <Header />
      <div className="py-6 bg-white dark:bg-black border-b border-[#ededed] dark:border-[#333]">
        <div className="container mx-auto text-4xl text-black dark:text-white">
          ???????????????? ??????????????
        </div>
      </div>
      <div className="container mx-auto py-[24px]">
        <form className="flex flex-col w-1/2" onSubmit={(e) => submit(e)}>
          <label
            htmlFor="title"
            className="pt-2 font-medium text-black dark:text-white text-md"
          >
            ??????????????????
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="?????????????? ?????????????????? ??????????????"
            className="text-black bg-white rounded-md dark:bg-black border-npne dark:text-white text-m p-2.5 border border-[#ededed] dark:border-[#333]"
            onChange={(e) => handle(e)}
          />
          <label
            htmlFor="img"
            className="pt-2 font-medium text-black dark:text-white text-md"
          >
            ??????????????????????
          </label>
          <input
            type="file"
            name="img"
            id="img"
            placeholder="?????????????? ??????????????????????"
            className="text-black bg-white rounded-md dark:bg-black border-npne dark:text-white text-m p-2.5 border border-[#ededed] dark:border-[#333]"
            onChange={(e) => setSelectedFileDocument(e.target.files[0])}
          />
          <label
            htmlFor="about"
            className="pt-2 font-medium text-black dark:text-white text-md"
          >
            ??????????
          </label>
          <input
            type="text"
            name="about"
            id="about"
            placeholder="?????????? ??????????????"
            className="text-black bg-white rounded-md dark:bg-black border-npne dark:text-white text-m p-2.5 border border-[#ededed] dark:border-[#333]"
            onChange={(e) => handle(e)}
          />
          <label
            htmlFor="date"
            className="pt-2 font-medium text-black dark:text-white text-md"
          >
            ????????
          </label>
          <input
            type="date"
            name="date"
            id="date"
            placeholder="?????????? ??????????????"
            className="text-black bg-white rounded-md dark:bg-black border-npne dark:text-white text-m p-2.5 border border-[#ededed] dark:border-[#333]"
            onChange={(e) => handle(e)}
          />
          <label
            htmlFor="desc"
            className="pt-2 font-medium text-black dark:text-white text-md"
          >
            ?????????? <span className="text-red-700 font-bold text-sm">(????????????????! ?????????????????????? ???? ??????????????????)</span>
          </label>
          {/* <textarea
            type="text"
            name="desc"
            id="desc"
            placeholder="???????????????? ?????????? ??????????????"
            className="text-black bg-white rounded-md dark:bg-black border-npne dark:text-white text-m p-2.5 border border-[#ededed] dark:border-[#333]"
            onChange={(e) => handle(e)}
          /> */}
          <div style={{ width: "100%", height: 300, marginBottom: 80 }}>
            <div className="text-black dark:text-white" ref={quillRef} />
          </div>
          <label
            htmlFor="cat_id"
            className="pt-2 font-medium text-black dark:text-white text-md"
          >
            ??????????????????
          </label>
          <select
            name="cat_id"
            id="cat_id"
            className="text-black bg-white rounded-md dark:bg-black border-npne dark:text-white text-m p-2.5 border border-[#ededed] dark:border-[#333]"
            onChange={(e) => handle(e)}
          >
            <option value="1">??????????????</option>
            <option value="2">??????????????????????</option>
            <option value="3">????????????????????????</option>
            <option value="4">??????????????????</option>
          </select>
          <div className="flex justify-end">
            <button className="w-1/2 mt-5 text-white bg-black dark:text-black dark:bg-white py-1.5 px-2 rounded-md border border-white dark:border-black hover:border-black hover:dark:border-white hover:bg-white hover:dark:bg-black hover:text-black hover:dark:text-white duration-150">
              ????????????????
            </button>
          </div>
        </form>
      </div>
      <Footer />
      <Switcher />
    </div>
  );
};

export default Addpost;