

interface TitleType {
    title: string;
}

export default function TitleCreate({ title }: TitleType) {
    return (
      <>
        <h1 className="text-4xl top-0 font-bold uppercase w-full p-6 text-start text-black bg-white shadow-md z-10">
          {title}
        </h1>
    </>
    )
};