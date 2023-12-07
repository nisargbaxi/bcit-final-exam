import { useEffect, useState } from "react";
import "./App.css";
import { FoodContent } from "./components/FoodContent";
import axios from "axios";
import { ENDPOINT_URL, FoodItem } from "./assets/constant";

function App() {
  const [foodItems, setFoodItems] = useState<FoodItem[] | null>();
  const [mark, setMarkWord] = useState<string>("");
  useEffect(() => {
    axios.get(`${ENDPOINT_URL}api/food`).then((response) => {
      setFoodItems(response.data);
    });
  }, []);

  const searchItem = (keyword: string) => {
    axios.get(`${ENDPOINT_URL}api/search?name=${keyword}`).then((response) => {
      setMarkWord(keyword);
      console.log("data : " + response.data);
      setFoodItems(response.data || null);
    });
  };

  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200 mb-5">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Food Items</h2>
          <div className="gap-5 mb-5 mt-5">
            Search box :
            <input
              type="text"
              onChange={(e) => searchItem(e.target.value)}
              placeholder="Search for food..."
              className="ml-2 border-2 rounded py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Description</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {foodItems && foodItems.length > 0 ? (
                  foodItems.map((item, index) => (
                    <FoodContent key={index} data={item} markedWord={mark} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>No food items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-5"> Final Exam Code Written by Nisarg Baxi</div>
      </div>
    </>
  );
}

export default App;
