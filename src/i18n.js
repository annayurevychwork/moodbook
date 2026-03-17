import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      header: { app_name: "Moodbook" },
      feed: {
        search_placeholder: "Search by author...",
        sort_newest: "Newest",
        sort_oldest: "Oldest",
        sort_popular: "Popular (likes)",
        empty_feed: "No posts found.",
        post_not_found: "Post not found!",
        back_to_feed: "Back to Feed"
      },
      form: {
        im_feeling: "I am feeling:",
        placeholder: "Share your health update or how you're doing...",
        privacy_public: "Public",
        privacy_journal: "Private Journal",
        share_btn: "Share Update",
        sharing: "Sharing...",
      },
      post: {
        write_comment: "Write a comment...",
        delete_post: "Delete post",
        delete_comment: "Delete comment",
        like: "Like post",
        unlike: "Unlike post",
        public: "Public",
        journal: "Journal"
      },
      profile: {
        display_name: "Display Name",
        avatar_url: "Avatar URL",
        save_changes: "Save Changes",
        cancel: "Cancel",
        community_member: "Community Member",
        updates: "Updates",
        edit_profile: "Edit Profile",
        mood_analytics: "Mood Analytics",
        history: "History",
        no_updates: "You haven't posted any updates yet."
      },
      moods: {
        feeling_good: "Feeling Good",
        anxious: "Anxious",
        feeling_down: "Feeling Down",
        need_support: "Need Support",
        grateful: "Grateful"
      },
      modal: {
        delete_title: "Delete Post",
        delete_desc: "Are you sure you want to delete this update? This action cannot be undone.",
        confirm_btn: "Yes, delete",
        cancel_btn: "Cancel"
      },
    }
  },
  uk: {
    translation: {
      header: { app_name: "Moodbook" },
      feed: {
        search_placeholder: "Пошук за автором...",
        sort_newest: "Найновіші",
        sort_oldest: "Найстаріші",
        sort_popular: "Популярні (лайки)",
        empty_feed: "Постів не знайдено.",
        post_not_found: "Пост не знайдено!",
        back_to_feed: "Повернутися до стрічки"
      },
      form: {
        im_feeling: "Мій настрій:",
        placeholder: "Поділіться тим, як ви себе почуваєте...",
        privacy_public: "Публічно",
        privacy_journal: "Особистий щоденник",
        share_btn: "Опублікувати",
        sharing: "Публікація...",
      },
      post: {
        write_comment: "Написати коментар...",
        delete_post: "Видалити пост",
        delete_comment: "Видалити коментар",
        like: "Вподобати пост",
        unlike: "Прибрати вподобайку",
        public: "Публічно",
        journal: "Щоденник"
      },
      profile: {
        display_name: "Ім'я користувача",
        avatar_url: "URL аватарки",
        save_changes: "Зберегти зміни",
        cancel: "Скасувати",
        community_member: "Учасник спільноти",
        updates: "Оновлень",
        edit_profile: "Редагувати профіль",
        mood_analytics: "Аналітика настрою",
        history: "Історія",
        no_updates: "Ви ще не публікували оновлень."
      },
      moods: {
        feeling_good: "Чудово",
        anxious: "Тривожно",
        feeling_down: "Сумно",
        need_support: "Потрібна підтримка",
        grateful: "Вдячність"
      },
      modal: {
        delete_title: "Видалити оновлення",
        delete_desc: "Ви впевнені, що хочете видалити цей пост? Цю дію неможливо скасувати.",
        confirm_btn: "Так, видалити",
        cancel_btn: "Скасувати"
      },
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;