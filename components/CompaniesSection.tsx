const CompaniesSection = () => {
    return (
      <div className="bg-card rounded-2xl p-8 mb-12 mx-6">
        <h3 className="text-xl mb-6">Companies I Worked for</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"].map(
            (company, index) => (
              <div
                key={index}
                className="h-12 bg-muted rounded-lg flex items-center justify-center"
              >
                {company}
              </div>
            )
          )}
        </div>
      </div>
    );
  };
  
  export default CompaniesSection;
  