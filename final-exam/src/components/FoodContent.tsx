import { FoodItem } from "../assets/constant";
interface FoodContentProps {
  data: FoodItem;
  markedWord: string;
}

const getHighlightedText = (text: string, highlight: string) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? {
                  color: "red",
                  backgroundColor: "lightyellow",
                }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};

export function FoodContent({ data, markedWord }: FoodContentProps) {
  return (
    <>
      {data && (
        <tr>
          <td className="p-2 whitespace-nowrap">
            <div className="text-left text-lg text-green-500">
              {markedWord
                ? getHighlightedText(data.name, markedWord)
                : data.name}
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-lg text-left">
              {markedWord
                ? getHighlightedText(data.description, markedWord)
                : data.description}
            </div>
          </td>
        </tr>
      )}
      {!data && (
        <tr>
          <td colSpan={2}> No food item found</td>
        </tr>
      )}
    </>
  );
}
