import Image from "next/image"

export function CoreValues() {
  const values = [
    {
      title: "Service with integrity",
      image: "/nysc-service-integrity.jpg",
    },
    {
      title: "Community above all",
      image: "/community-development.png",
    },
    {
      title: "Impact for everyone",
      image: "/inclusive-community-programs.jpg",
    },
  ]

  return (
    <section className="px-6 py-20 relative overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-white">
      {/* Decorative Circle Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 opacity-30">
        <Image
          src="/images/design-mode/image.png"
          alt=""
          width={160}
          height={160}
          className="w-full h-full"
        />
      </div>
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-40">
        <Image
          src="/images/design-mode/image.png"
          alt=""
          width={128}
          height={128}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-cyan-300 to-teal-300 rounded-full px-4 py-2 shadow-md mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">+</span>
              </div>
              <span className="text-teal-900 font-bold text-sm">NYSC Jos North</span>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our values aren't just words—they're promises. Every decision we make is anchored by them.
          </p>
        </div>

        {/* Value Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-gradient-to-r from-cyan-200 to-teal-200 rounded-full px-6 py-3 shadow-md"
            >
              <p className="text-teal-900 font-medium">{value.title}</p>
            </div>
          ))}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-gray-200 rounded-2xl overflow-hidden h-64 flex items-center justify-center"
            >
              <Image
                src={value.image || "/placeholder.svg"}
                alt={value.title}
                width={300}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
