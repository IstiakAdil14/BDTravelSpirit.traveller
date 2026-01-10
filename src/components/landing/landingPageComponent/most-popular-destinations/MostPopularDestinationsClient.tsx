import MostPopularDestinationsUI from "./MostPopularDestinationsUI";

export default function MostPopularDestinationsClient() {
  const title = "Most Popular Destinations";
  const subtitle = "Discover the most loved destinations by travelers worldwide. From pristine beaches to cultural wonders, these spots have captured hearts and created unforgettable memories.";
  const buttonText = "Explore All Destinations";

  return (
    <MostPopularDestinationsUI
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
    />
  );
}
