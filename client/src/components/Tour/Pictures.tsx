import React from "react";
interface ImgType {
  images: string[] | undefined;
}
export default function Pictures({ images }: ImgType) {
  return (
    <section className="section-pictures">
      {images?.map((item, index) => {
        return (
          <div className="picture-box" key={index}>
            <img
              className={`picture-box__img picture-box__img--${index + 1}`}
              src={item}
              alt=""
            />
          </div>
        );
      })}
    </section>
  );
}
