const AboutUs = ({ aboutus }: { aboutus?: string }) => (
  <div className="text-center sm:text-right">
    <h3 className="text-lg font-semibold mb-4 text-right">روئيتنا</h3>
    <p className="text-muted-foreground text-sm">
      {aboutus ||
        "Discover our journey and what drives us forward. We are dedicated to providing high-quality services to our customers."}
    </p>
  </div>
);
export default AboutUs;
