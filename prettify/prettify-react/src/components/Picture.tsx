import { TweetInterface } from "../interfaces/interfaces";
import domtoimage from "dom-to-image";
import "./Picture.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
interface Props {
  tweet: TweetInterface;
}
interface ColorInterface {
  background: string;
  isDarkTheme: boolean;
}
interface ColorPickerProps {
  handleColorChange: (color: string) => void;
}
const ColorPicker: React.FC<ColorPickerProps> = ({ handleColorChange }) => {
  const handleClick = (e: React.MouseEvent) => {
    const gradient = String(e.currentTarget.getAttribute("data-gradient"));
    handleColorChange(gradient);
  };

  return (
    <div className="color-picker-modal">
      <div
        onClick={(e) => handleClick(e)}
        className="option light-gradient"
        data-gradient="light"
      ></div>
      <div
        onClick={(e) => handleClick(e)}
        className="option light-blue-gradient"
        data-gradient="light-blue"
      ></div>
      <div
        onClick={(e) => handleClick(e)}
        className="option light-gray-gradient"
        data-gradient="light-gray"
      ></div>
      <div
        onClick={(e) => handleClick(e)}
        className="option light-gray-gradient"
        data-gradient="dark"
      ></div>
      <div
        onClick={(e) => handleClick(e)}
        className="dark-blue-gradient option"
        data-gradient="dark-blue"
      ></div>
    </div>
  );
};
export const TweetPicture: React.FC<Props> = ({ tweet }) => {
  const { avatar, name, likes, date, text } = tweet;
  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  const picture = useRef<HTMLElement>(null);	
  const handleColorChange = (color: string) => {
    setColorState({ ...colorState, background: `${color}-gradient` });
  };
  const [colorState, setColorState] = useState<ColorInterface>({
    background: "light-gradient",
    isDarkTheme: false,
  });
  const onDownload = async () => {
		  //h2c(document.querySelector(".picture-container") as HTMLElement).then(
      //function(canvas){
        //const image = canvas.toDataURL("image/png");
        //console.log(image, "this be image");
//
        //canvas.toBlob(function (blob) {
          //// blob ready, download it
          //let link = document.createElement("a");
          //link.download = "example.png";
//
          //link.href = URL.createObjectURL(blob as Blob);
          //link.click();
//
          //// delete the internal blob reference, to let the browser clear memory from it
          //URL.revokeObjectURL(link.href);
        //}, "image/png");
      //}
    //);
		  
		const node = picture.current as HTMLElement;
		domtoimage.toBlob(node)
		.then((blob) => {
			const link = document.createElement('a');
			link.download = 'test.png';
			link.href = URL.createObjectURL(blob as Blob);
			link.click();
			URL.revokeObjectURL(link.href);
		});



  };
  const [showResponses, setShowResponses] = useState<boolean>(false);

  return (
    <>
      {openColorPicker && <ColorPicker handleColorChange={handleColorChange} />}
      <ul className="menu">
        <li
          onClick={() => {
            setOpenColorPicker(true);
          }}
          className="color-picker-button"
        >
          Color
        </li>
        <li
          onClick={() => setShowResponses(!showResponses)}
          className="show-responses"
        >
          Responses
        </li>
        <li
          onClick={() =>
            setColorState({
              ...colorState,
              isDarkTheme: !colorState.isDarkTheme,
            })
          }
          className="theme-switcher"
        >
          Dark
        </li>
        <li className="copy-image">Copy</li>
        <li
          onClick={() => {
            onDownload();
          }}
          className="download-image"
        >
          Download
        </li>
        <li className="cancel">Cancel</li>
      </ul>

      <article ref={picture} className={`picture-container ${colorState.background}`}>
        <div
          className={`picture-tweet ${
            colorState.isDarkTheme
              ? "picture-tweet-dark"
              : "picture-tweet-light"
          }`}
        >
          <div className="picture-user">
            <div className="picture-avatar">
              <img src={`${avatar}`} />
            </div>

            <div className="picture-name">
              <span className="picture-name-name">{name!.split("\\n")[0]}</span>
              <span className="picture-name-user">{name!.split("\\n")[1]}</span>
            </div>
          </div>
          <div className="picture-text">
            <p className="picture-text-paragraph">{text}</p>
          </div>
          <div className="picture-date">{date}</div>
          {showResponses && <div className="picture-likes">{likes}</div>}
        </div>
      </article>
    </>
  );
};
