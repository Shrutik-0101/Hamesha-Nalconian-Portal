import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  galleryImages: {
    type: [String],
    default: [
      '/src/assets/g1.jpg',
      '/src/assets/g2.jpg',
      '/src/assets/g3.jpg',
      '/src/assets/g4.jpg',
      '/src/assets/g5.jpg',
      '/src/assets/g6.jpg'
    ]
  },
  notifications: {
    type: [
      {
        text: String,
        isNewTag: { type: Boolean, default: false }
      }
    ],
    default: [
      { text: "Empanelled Hospitals valid upto 30-09-2026", isNewTag: true },
      { text: "PRMBS session recording uploaded", isNewTag: true },
      { text: "Superannuation list for May 2026 published", isNewTag: false },
      { text: "Medical reimbursement form updated", isNewTag: false }
    ]
  },
  importantLinks: {
    type: [
      {
        text: String,
        url: String
      }
    ],
    default: [
      { text: "Indian Rail Info", url: "http://www.indianrail.gov.in/" },
      { text: "Railway Ticket Booking", url: "https://www.irctc.co.in" },
      { text: "Life Insurance Corporation of India LIC", url: "https://www.licindia.in/" },
      { text: "Nalco website", url: "https://www.nalcoindia.com/" },
      { text: "Flight Booking", url: "https://www.makemytrip.com/flights/" },
      { text: "State Bank Of India", url: "https://www.onlinesbi.com/" },
      { text: "Indian Government", url: "https://india.gov.in/" },
      { text: "The Gazette of India", url: "http://egazette.nic.in" },
      { text: "OLD AGE SOLUTIONS", url: "https://www.oldagesolutions.org/" }
    ]
  },
  announcements: {
    type: [String],
    default: [
      "Medical reimbursement deadline: 30 June 2026",
      "Pension revision circular now available",
      "Welfare Camp – Bhubaneswar – 15 June 2026",
      "Updated empanelled hospitals list uploaded",
      "Superannuation list for May 2026 published",
      "PRMBS session recording uploaded"
    ]
  }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);
export default Content;
