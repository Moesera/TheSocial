export const errorMessage = (error, message) => {
  /**  creating div for the error element */
  const errorWrapper = document.createElement("div");
  errorWrapper.className = "w-50 m-auto p-0 fs-5 d-flex align-items-center justify-content-center";
  /** creating error message */
  const msgWrapper = document.createElement("p");
  msgWrapper.textContent = `"${error}": ${message}`;
  msgWrapper.className = "alert-danger alert";

  /** appending message to container */
  const errorFeedback = errorWrapper.appendChild(msgWrapper);
  return errorFeedback;
};
