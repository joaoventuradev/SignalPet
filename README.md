# Project Name

## Overview

This project implements a translation feature for a web application where users can dynamically switch between multiple languages. The frontend is built with **React**, and the backend is powered by **NestJS**. The application automatically detects the user's browser language and offers translation functionality. We also address points like error handling, automatic language detection, cost reduction for translation requests, and storing user preferences.

## Features

- **Multi-language Support**: Supports multiple languages including English, German, Spanish, French, and Portuguese.
- **Automatic Language Detection**: Detects the user's browser language and automatically switches to it if supported.
- **Translation Cache**: Reduces translation costs by caching previously translated text in the frontend.
- **Error Handling**: Displays error messages if an unsupported language is provided.

---

## Setup and Running the Application

### 1. Zip project

First, clone the project to your local machine:

```bash
zip folder
cd signalpet-dev-fs-ha
```

### 2. Backend Setup (NestJS)

#### Install Dependencies

Navigate to the `nest-backend` folder and install the necessary dependencies:

```bash
cd nest-backend
npm install
npm run start
```

### 3. Frontend Setup (React)

#### Install Dependencies

Navigate to the `react-frontend` folder and install the necessary dependencies:

```bash
cd react-frontend
npm install
npm run start
```

#### Using `LibreTranslate` (for Mocking)

If you prefer to mock the translation API without setting up a custom server, you can use **LibreTranslate**, an open-source translation service that can be easily integrated into your application.

1. Visit the [LibreTranslate API](https://libretranslate.com/) website to get access to the API or host it locally.

2. Run `LibreTranslate`:
```bash
cd LibreTranslate-main
console -> ./run.sh –-load-only en,es,de,pt,fr –-update-models --port 5001

Note: for me this was the only command that worked
console -> ./run.sh --port 5001
```


## 2. Future Improvements

While the current implementation meets the core requirements, there are several potential improvements that could enhance the application further. These improvements are focused on scalability, performance, and user experience.

#### 1. **Expand Language Support**
The current project supports a limited set of languages (`en`, `de`, `es`, `fr`, `pt`). However, to increase the reach of the application, it would be beneficial to:
- Add more languages to the translation system.
- Integrate more sophisticated translation APIs that support additional languages.
- Enable dynamic language selection with a more robust way to detect and manage supported languages.

#### 2. **Enhanced Error Handling**
Currently, error handling is implemented to catch unsupported languages, but there are other potential failures that need attention:
- Implement better error handling for API failures, including timeouts and rate-limiting issues.
- Show more detailed error messages to users when something goes wrong, rather than just a generic error.
- Add a fallback mechanism in case the translation service is down (e.g., caching translations more effectively).

Aqui está a versão atualizada do Ponto 3: Performance Optimizations, com a adição de uma sugestão sobre o uso de banco de dados para otimizar ainda mais a performance:

### 3. Performance Optimizations
While the translation system caches translations to reduce API calls, there is always room for optimization:

- Implement a more efficient caching system using Redis or session storage to avoid frequent translation requests.
- Optimize frontend rendering, especially when translating large amounts of text or handling multiple language changes at once.
- Utilize server-side rendering (SSR) or static site generation (SSG) to improve performance for SEO and initial load time.
 -Consider using a database (e.g., PostgreSQL, MongoDB) to store translations and associated metadata. This would allow translations to be stored persistently and retrieved quickly, reducing the reliance on external APIs and improving performance for frequently accessed content.

#### 4. **Internationalization (i18n) Support**
Currently, the project uses a basic mechanism for handling language changes. A more scalable solution would be to integrate proper **internationalization (i18n)**:
- Implement **`react-i18next`** or a similar library to handle not only translation of text but also formatting of dates, numbers, and currencies based on the user's locale.
- Provide a smooth user experience where all text, including UI components, forms, and buttons, is properly localized.
- Support fallback mechanisms in case a translation is not available for a particular language.

#### 5. **User Authentication and Language Preferences**
Another potential enhancement is to tie the user's language preferences to an authenticated account:
- Store language preferences on the backend, tied to the user's profile.
- Ensure that users' language preferences are persistent across devices, even after logging out and logging back in.
- Add an option for users to manually set their preferred language, independent of the browser's language setting.

### 6. **Project Overview**

First, I tackled the backend (Next.js) to set up a structure capable of providing the frontend with translation requests. Using LibreTranslate-main as the translation source, we have a service in the backend that calls it and performs the translation. Initially, we have a Map which serves as our cache, where we first check if the desired translation is already available. If it doesn't exist, we will translate it using LibreTranslate-main and later store it so that we don't need to call this API again in the future.

This Cache object is a map that contains entries for all the languages we support. Each entry points to another map, where the key is the string ID that is sent for translation, and the value is the translated string for the language key in this cache.

In the React (frontend), I implemented a global solution to minimize code repetition and centralize the language management at the root of the project. I created a context (TranslationProvider.tsx) that provides a centralized way to handle language translations across the app.

The TranslationProvider component manages the current language state and translation logic. It provides functions to change the language and automatically translate the page content by updating elements with the translate='yes' attribute.

The translatePage function iterates over these elements and translates their text asynchronously using the translateText service. The useEffect hook ensures the page is re-translated whenever the language changes.

The useTranslation hook allows easy access to the current language and translation functionality throughout the app.

This approach ensures efficient and scalable language management, making translations easily accessible across the app.

Additionally, the app detects the browser's language and automatically translates the page when it initializes. The useEffect hook ensures the page is translated whenever the language changes or when the app loads.

The useTranslation hook makes the translation functionality accessible throughout the app.

This approach ensures efficient and scalable language management, automatically adapting the page to the user's language.

---
