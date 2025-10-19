const config = {
  data: {
    // Main invitation title that appears on the page
    title: "Pernikahan Yusuf & Aulia",
    // Opening message/description of the invitation
    description:
      "Kami akan menikah dan mengundang Anda untuk turut merayakan momen istimewa ini.", // Nanti ini dibikin random
    // Groom's name
    groomName: "Yusuf",
    // Bride's name
    brideName: "Aulia",
    // Groom's parents names
    parentGroom: "Bapak Groom & Ibu Groom",
    // Bride's parents names
    parentBride: "Bapak Bride & Ibu Bride",
    // Wedding date (format: YYYY-MM-DD)
    date: "2025-12-14",
    // Google Maps link for location (short clickable link)
    maps_url: "https://maps.app.goo.gl/2RrphLbJGA3BEzFo7",
    // Google Maps embed code to display map on website
    // How to get: open Google Maps → select location → Share → Embed → copy link
    maps_embed:
    // <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d248.3347534067513!2d111.58466243323213!3d-7.153192510336271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1760877883922!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.763374371285!2d111.5845188!3d-7.1533349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7765002b6caeef%3A0x9ba00f0930ac3d38!2sMillie%20Laundry!5e0!3m2!1sid!2sid!4v1760898770177!5m2!1sid!2sid",
    // Event time (free format, example: "10:00 - 12:00 WIB")
    time: "10:00 - 13:00 WIB",
    // Venue/building name
    location: "Millie Laundry",
    // Full address of the wedding venue
    address: "RHWM+MQ3, Balun Sawahan Lorong 5, Bulansawahan, Balun, Kec. Cepu, Kabupaten Blora, Jawa Tengah 58311",
    // Image that appears when link is shared on social media
    ogImage: "/images/og-image.jpg",
    // Icon that appears in browser tab
    favicon: "/images/favicon.ico",
    // List of event agenda/schedule
    agenda: [
      {
        // First event name
        title: "Akad Nikah",
        // Event date (format: YYYY-MM-DD)
        date: "2025-12-14",
        // Start time (format: HH:MM)
        startTime: "10:00",
        // End time (format: HH:MM)
        endTime: "11:00",
        // Event venue
        location: "Millie Laundry",
        // Full address
        address: "RHWM+MQ3, Balun Sawahan Lorong 5, Bulansawahan, Balun, Kec. Cepu, Kabupaten Blora, Jawa Tengah 58311",
      },
      {
        // Second event name
        title: "Resepsi Nikah",
        date: "2025-12-14",
        startTime: "12:00",
        endTime: "13:00",
        location: "Millie Laundry",
        address: "Jl. Jend. Sudirman No.1, Jakarta",
      }
      // You can add more agenda items with the same format
    ],

    // Background music settings
    audio: {
      // Music file (choose one or replace with your own file)
      src: "/audio/reff-i-think-they-call-this-love.mp3", // or /audio/nature-sound.mp3
      // Music title to display
      title: "Elliot James Reay - I Think They Call This Love ", // or Nature Sound
      // Whether music plays automatically when website opens
      autoplay: true,
      // Whether music repeats continuously
      loop: true
    },

    // List of bank accounts for digital envelope/gifts
    banks: [
      {
        // Bank name
        bank: "Bank BCA",
        // Account number
        accountNumber: "1234567890",
        // Account holder name (all uppercase)
        accountName: "Yusuf Tis'a Doni",
      },
      {
        bank: "Bank BSI",
        accountNumber: "0987654321",
        accountName: "Regina Rizki Aulia",
      }
      // You can add more banks with the same format
    ]
  }
};

export default config;