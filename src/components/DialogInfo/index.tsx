import ButtonPrimary from "../ButtonPrimary";
import "./styles.css";

type Props = {
  message: string;
  onDialogClose: Function;
};

export default function DialogInfo({ message, onDialogClose }: Props) {
  return (
    <div onClick={() => onDialogClose()} className="dsc-dialog-background">
      <div className="dsc-dialog-box" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <div style={{ width: "100%" }} onClick={() => onDialogClose()}>
          <ButtonPrimary text="ok" />
        </div>
      </div>
    </div>
  );
}
