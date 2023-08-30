import ButtonInverse from "../ButtonInverse";
import ButtonPrimary from "../ButtonPrimary";
import "./styles.css";

type Props = {
  message: string;
  onDialogAnswer: Function;
};

export default function DialogConfirmation({ message, onDialogAnswer }: Props) {
  return (
    <div
      onClick={() => onDialogAnswer(false)}
      className="dsc-dialog-background"
    >
      <div className="dsc-dialog-box" onClick={(e) => e.stopPropagation()}>
        <h2>{message}</h2>
        <div style={{ width: "100%", display: "flex", gap: "10px" }}>
          <div style={{ width: "100%" }} onClick={() => onDialogAnswer(false)}>
            <ButtonInverse text="Não" />
          </div>
          <div style={{ width: "100%" }} onClick={() => onDialogAnswer(true)}>
            <ButtonPrimary text="Sim" />
          </div>
        </div>
      </div>
    </div>
  );
}
