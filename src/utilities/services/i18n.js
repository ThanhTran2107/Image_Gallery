import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { LOCALE } from 'utilities/constant';

const { EN, VI } = LOCALE;

const options = {
  order: ['localStorage'],
  lookupLocalStorage: 'locale',
  caches: ['localStorage'],
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: options,
    fallbackLng: EN,
    resources: {
      [EN]: {
        translation: {
          images_count: 'IMAGES',
          select_actions: 'Select Actions',
          create_an_album: 'Create an album',
          name: 'Name',
          place_holder_album_name: 'Enter the album name',
          avatar: 'Avatar',
          delete_the_album: 'Delete the album',
          create: 'Create',
          cancel: 'Cancel',
          album_name_rule: 'Please enter the album name',
          create_album_success: 'Create a new album successfully!',
          create_album_failed: 'Create an album failed!',
          delete_album_success: 'Delete the album successfully!',
          delete_album_failed: 'Delete the album failed!',
          delete_album_failed_details: 'Delete the album occurs error!',
          upload_file_failed: 'Upload image occurs error!',
          confirm: 'Confirm',
          confirm_delete_album_question: 'Are you sure you want to delete this album?',
          delete: 'Delete',
          all_albums: 'All Albums',
          update_album_name_success: 'Update album name successfully!',
          update_album_avatar_success: 'Update album avatar successfully!',
          validate_files_length: 'You can upload only 200 images at a time!',
          validate_files_size: 'Too large. Max allowed size is 10 MB!',
        },
      },
      [VI]: {
        translation: {
          images_count: 'ẢNH',
          select_actions: 'Chọn Thao Tác',
          create_an_album: 'Tạo album mới',
          name: 'Tên Album',
          place_holder_album_name: 'Nhập tên album',
          avatar: 'Ảnh Đại Diện',
          delete_the_album: 'Xóa album',
          create: 'Tạo',
          cancel: 'Hủy',
          album_name_rule: 'Vui lòng nhập tên album',
          create_album_success: 'Tạo album mới thành công!',
          create_album_failed: 'Tạo album thất bại!',
          delete_album_success: 'Xóa album thành công!',
          delete_album_failed: 'Xóa album thất bại!',
          delete_album_failed_details: 'Quá trình xóa album xảy ra lỗi!',
          upload_file_failed: 'Quá trình tải ảnh lên xảy ra lỗi!',
          confirm: 'Xác Nhận',
          confirm_delete_album_question: 'Bạn có chắc chắn muốn xóa album này không?',
          delete: 'Xóa',
          all_albums: 'Danh Sách Album',
          update_album_name_success: 'Cập nhật tên album thành công!',
          update_album_avatar_success: 'Cập nhật ảnh đại diện album thành công!',
          validate_files_length: 'Bạn chỉ có thể tải lên tối đa 200 ảnh cùng lúc thôi!',
          validate_files_size: 'Quá lớn. Kích cỡ tối đa là 10 MB!',
        },
      },
    },
  });
