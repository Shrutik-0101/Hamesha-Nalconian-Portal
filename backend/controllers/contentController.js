import Content from '../models/Content.js';

export const getContent = async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = await Content.create({});
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content(req.body);
    } else {
      content.galleryImages = req.body.galleryImages || content.galleryImages;
      content.notifications = req.body.notifications || content.notifications;
      content.importantLinks = req.body.importantLinks || content.importantLinks;
      content.announcements = req.body.announcements || content.announcements;
    }
    await content.save();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error: error.message });
  }
};
