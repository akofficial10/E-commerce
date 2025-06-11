import React, { useEffect } from "react";

const TeamPage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Founder & Chief Dermatologist",
      bio: "MD Dermatology with 15+ years clinical experience",
      specialty: "Sensitive skin formulations",
    },
    {
      name: "Aisha Khan",
      role: "Head Chemist",
      bio: "PhD in Cosmetic Science",
      specialty: "Stable vitamin C derivatives",
    },
    {
      name: "Rohan Patel",
      role: "Sustainability Officer",
      bio: "Environmental Science background",
      specialty: "Eco-friendly packaging solutions",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Meet Our Team
      </h1>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {team.map((member, i) => (
          <div
            key={i}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-gray-100 h-48 flex items-center justify-center text-gray-400">
              <img
                src="https://media.istockphoto.com/id/1134255601/photo/handsome-hispanic-man-wearing-casual-t-shirt-at-home-smiling-in-love-showing-heart-symbol-and.jpg?s=1024x1024&w=is&k=20&c=R_60n183CpemDx6KoYIRtn2kBXKI2tcQGY3cXVxmsS4="
                alt=""
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <p className="text-gray-600 mb-3">{member.bio}</p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Specialty:</span>{" "}
                {member.specialty}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-pink-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          We're always looking for passionate individuals to join our team of
          skincare innovators.
        </p>
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          View Careers
        </button>
      </div>
    </div>
  );
};

export default TeamPage;
