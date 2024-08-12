interface CardType {
  color: string;
  quantity: number;
  text: string;
  icon: any;
}

export function Card({ color, quantity, text, icon }: CardType) {
  return (
    <>
      <div className={`${color} flex flex-row p-6 rounded-xl`}>
        <div className="flex flex-col flex-1">
          <strong className="text-3xl font-bold">{quantity}</strong>
          <span className="text-sm text-black">{text}</span>
        </div>
        {icon}
      </div>
    </>
  );
}
