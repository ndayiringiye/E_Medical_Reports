import { useEffect, useState } from "react";
import treatment from "../../public/images/treatment.png";
import counseling from "../../public/images/conselling.png";
import screening from "../../public/images/screen.png";

const impactData = [
  {
    title: "Medical Treatment",
    image: treatment,
    items: ["HIV and AIDS", "Chlamydia", "Gonorrhea","Genintal herpes" , "Others"],
    total: 200,
    color: "bg-white border-cyan-500",
  },
  {
    title: "Counseling Services",
    image: counseling,
    items: [
      "Drug Abuse Prevention",
      "Unwanted Pregnancy",
      "Marriage Preparation",
      "STIs Awareness",
      "Life Development",
    ],
    total: 240,
    color: "bg-white border-pink-400",
  },
  {
    title: "Screening & Support",
    image: screening,
    items: ["Trichomoniasis", "HPV", "HIV", "Genital herpes", "Others"],
    total: 300,
    color: "bg-white border-green-500",
  },
];
const Testimonies = () => {
  const [counts, setCounts] = useState(impactData.map(() => 0));
  useEffect(() => {
    const intervals = impactData.map((data, index) =>
      setInterval(() => {
        setCounts((prev) =>
          prev.map((count, i) =>
            i === index && count < data.total ? count + 1 : count
          )
        );
      }, 15)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  const totalImpacts = impactData.reduce((sum, item) => sum + item.total, 0);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-14">
        Our Community Impact
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {impactData.map((item, index) => (
          <div
            key={index}
            className={`transition-all duration-300 hover:shadow-xl border-t-4 ${item.color} rounded-xl p-6 shadow-sm`}
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={item.image} alt={item.title} className="w-12 h-12" />
              <h2 className="text-xl font-bold text-gray-800">
                {item.title}
              </h2>
            </div>
            <ul className="text-gray-600 text-sm mb-5 space-y-1 pl-5 list-disc">
              {item.items.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-cyan-500">+{counts[index]}</div>
              <div className="text-sm text-gray-500 font-medium">
                {(item.total / totalImpacts * 100).toFixed(1)}% of total
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonies;
