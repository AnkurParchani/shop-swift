// If there are no addresses or no items in the cart of the user then showing this page
const IncompleteDetails = () => {
  return (
    <div>
      <p>
        You are not allowed on this page as your previous details are missing
      </p>
    </div>
  );
};

export default IncompleteDetails;
