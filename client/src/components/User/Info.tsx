import React, { useEffect, useState } from "react";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../utils/firebase";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { UpdateMe } from "../../apis/authApi";
import { createAxios } from "../../apis/createInstance";
import { LoginSuccess } from "../../redux/authSlice";

interface FormState {
  name: string | undefined;
  email: string | undefined;
  number: string | undefined;
  photo: any;
  name_photo?: string;
}
const state: FormState = {
  name: "",
  email: "",
  number: "",
  photo: "",
  name_photo: "",
};
export default function Info() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [form, setForm] = useState<FormState>(state);
  const [file, setFile] = useState<any>(null);

  let axiosJWT = createAxios(user, dispatch, LoginSuccess);

  const uploadFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const today = new Date().toISOString();
    if (file == null) {
      handeUpdateInfo(e);
    } else {
      const imageRef = ref(storage, `/users/${today + file.name}`);

      if (user?.name_photo !== "default") {
        const desertRef = ref(storage, `/users/${user?.name_photo}`);

        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            alert(error.message);
          });
      }

      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          handeUpdateInfo(e, url, today + file.name);
        });
      });
    }
  };

  const TransformFileData = (file: any) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, photo: reader.result }));
      };
    } else {
      return;
    }
  };

  const handeUpdateInfo = (
    e: React.FormEvent<HTMLFormElement>,
    url?: string,
    name_photo?: string
  ) => {
    const data = {
      name: form.name,
      number: form.number,
      photo: url || form.photo,
      name_photo: name_photo || user?.name_photo,
      email: form.email,
    };
    e.preventDefault();
    UpdateMe(dispatch, data, "info", axiosJWT, user?.accessToken);
  };

  useEffect(() => {
    const info: FormState = {
      name: user?.name,
      email: user?.email,
      number: user?.number,
      photo: user?.photo,
      name_photo: user?.name_photo,
    };
    setForm(info);
  }, [user]);

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
      <form action="" className="form form-user-data" onSubmit={uploadFile}>
        <div className="form__group">
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <input
            type="text"
            className="form__input"
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            id="name"
          />
        </div>
        <div className="form__group">
          <label htmlFor="email" className="form__label">
            Email address
          </label>
          <input
            type="email"
            className="form__input"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            id="email"
          />
        </div>
        <div className="form__group">
          <label htmlFor="number" className="form__label">
            Number
          </label>
          <input
            type="text"
            className="form__input"
            value={form.number}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, number: event.target.value }))
            }
            id="number"
          />
        </div>
        <div className="form__group form__photo-upload">
          <img src={form.photo} alt="" className="form__user-photo" />
          <input
            type="file"
            accept="image/*"
            id="photo"
            className="form__upload"
            onChange={(e: any) => {
              TransformFileData(e.target.files[0]);
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor="photo">Chose new photo</label>
        </div>
        <div className="form__group right">
          <button className="btn btn--small btn--green">Save settings</button>
        </div>
      </form>
    </div>
  );
}
