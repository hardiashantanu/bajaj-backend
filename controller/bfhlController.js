const { processFile } = require('../utils/fileService.js');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asynchandler = require('../utils/asyncHandler');

// Prime number check function
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Controller for handling the POST request to `/bfhl`
exports.processBfhlData = asynchandler(async (req, res, next) => {
    const { data, file_b64 } = req.body;

    // Validate the data field
    if (!data || !Array.isArray(data)) {
        return next(new ApiError(400, 'Data should be an array.'));
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && /^[A-Za-z]$/.test(item));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length
        ? [lowercaseAlphabets.sort().pop()]
        : [];

    // Check if prime number is found
    const isPrimeFound = numbers.some(number => isPrime(Number(number)));

    // Handle file validity
    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKB = null;

    if (file_b64) {
        const fileData = await processFile(file_b64);
        if (fileData) {
            fileValid = true;
            fileMimeType = fileData.mimeType;
            fileSizeKB = fileData.sizeKB;
        }
    }

    // Prepare the response data
    const result = {
        is_success: true,
        user_id: "john_doe_17091999",  // Replace with dynamic logic if needed
        email: "john@xyz.com",  // Replace with dynamic logic if needed
        roll_number: "ABCD123",  // Replace with dynamic logic if needed
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        is_prime_found: isPrimeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    };

    // Return the response using ApiResponse utility
    res.status(200).json(new ApiResponse(200, result, ""));
});
