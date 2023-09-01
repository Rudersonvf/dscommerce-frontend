export default function FomrInput(props: any) {
  const { validation, ...inputProps } = props;

  return <input {...inputProps} />;
}
