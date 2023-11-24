import React from "react";

export const RenderCountForm = (props) => {
  return (
    <>
      <p>Вопрос: </p>
      <input type="text" style={{ minWidth: "630px", marginBottom: "6px" }} />
      <p>Ответ:</p>
      <input type="text" style={{ minWidth: "630px", marginBottom: "6px" }} />
    </>
  );
};
