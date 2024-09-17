const CommonForm = ({
  formControls,
  formData,
  setFormData,
  formTitle,
  handleSubmit,
  buttonText,
  isLogin,
}) => {
  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <>
            <label htmlFor={getControlItem.name} className="label p-2">
              <span className="text-base label-text">
                {getControlItem.label}
              </span>
            </label>
            <input
              type={getControlItem.type}
              name={getControlItem.name}
              id={getControlItem.name}
              placeholder={getControlItem.placeholder}
              value={value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: e.target.value,
                })
              }
              className="w-full input input-bordered h-10"
            />
          </>
        );
        break;
      case "checkbox": {
        const checkboxOptions = getControlItem?.options;
        element = (
          <div className="flex">
            {checkboxOptions && checkboxOptions.length > 0
              ? checkboxOptions.map((checkboxItem) => (
                  <div className="form-control" key={checkboxItem.id}>
                    <label
                      htmlFor={checkboxItem.name}
                      className="label gap-2 cursor-pointer"
                    >
                      <span className="label-text">{checkboxItem.label}</span>
                      <input
                        type="checkbox"
                        id={checkboxItem.name}
                        className="checkbox border-base-content"
                      />
                    </label>
                  </div>
                ))
              : null}
          </div>
        );
        break;
      }
      default:
        element = (
          <div>
            <label htmlFor={getControlItem.name} className="label p-2">
              <span className="text-base label-text">
                {getControlItem.label}
              </span>
            </label>
            <input
              type={getControlItem.type}
              name={getControlItem.name}
              id={getControlItem.name}
              placeholder={getControlItem.placeholder}
              value={value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: e.target.value,
                })
              }
              className="w-full input input-bordered h-10"
            />
          </div>
        );
        break;
    }

    return element;
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          {formTitle}
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {formControls.map((controlItem) => (
            <div key={controlItem.name}>
              {renderInputsByComponentType(controlItem)}
            </div>
          ))}

          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {isLogin ? "Don't have an account" : "Already have an account?"}
          </a>

          <div>
            <button
              type="submit"
              className={`btn btn-block btn-sm mt-2 ${
                !isLogin ? "border  border-slate-700" : ""
              }`}
            >
              {buttonText || "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommonForm;
