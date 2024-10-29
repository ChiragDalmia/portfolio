


 // Function to get the first name and format it
 export const formatFirstName = (fullName: string) => {
    const firstName = fullName.split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };