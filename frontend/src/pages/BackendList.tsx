import List from "../components/List";

const data = [
  {
    id: "1",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
  {
    id: "2",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
  {
    id: "3",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
  {
    id: "4",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
  {
    id: "5",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
  {
    id: "6",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
  {
    id: "7",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
  {
    id: "8",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
  {
    id: "9",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
  {
    id: "10",
    question: "이것은 테스트입니다. 이것이 질문이 될거에요. 백엔드와 프론트의 차이점은?",
    created: "2025-11-12"
  },
];

const BackendList = () => {
  return (
    <div className="relative">
      <div className="relative h-80">
        <img src="/background_back.jpg" alt="백엔드 배경" className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 bg-black opacity-60 z-[1]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto my-15">
        <List data={data} />
      </div>

      
    </div>
  );
};

export default BackendList;