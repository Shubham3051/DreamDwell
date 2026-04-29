/**
 * Formats numbers into a readable currency string.
 * Default: Indian Rupees (INR) using the Indian Numbering System.
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined) return "Price on Request";

  // If price is a string, convert to number
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  // Use Intl.NumberFormat for locale-specific formatting
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // Removes .00 for a cleaner real estate look
  }).format(numericPrice);
};

/**
 * Shortens large prices (e.g., 1.5 Crore instead of 1,50,00,000)
 */
export const formatPriceShort = (price) => {
  if (!price) return "N/A";
  
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  
  return formatPrice(price);
};