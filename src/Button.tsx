interface Props {
  item: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ item, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      key={item}
      className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      {item}
    </button>
  );
};

export default Button;
