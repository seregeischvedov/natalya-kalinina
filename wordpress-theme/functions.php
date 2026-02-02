<?php
/**
 * Theme Functions
 * 
 * @package Kalinina_Psychology
 * @version 1.0.0
 */

// Подключение стилей и скриптов
function kalinina_psy_enqueue_scripts() {
    // Google Fonts
    wp_enqueue_style('kalinina-google-fonts', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap', array(), null);
    
    // Font Awesome
    wp_enqueue_style('font-awesome', 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css', array(), '6.4.0');
    
    // Основные стили темы
    wp_enqueue_style('kalinina-main-style', get_template_directory_uri() . '/css/style.css', array(), '1.0.0');
    wp_enqueue_style('kalinina-style', get_stylesheet_uri(), array('kalinina-main-style'), '1.0.0');
    
    // JavaScript
    wp_enqueue_script('kalinina-main-js', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'kalinina_psy_enqueue_scripts');

// Поддержка функций WordPress
function kalinina_psy_setup() {
    // Поддержка заголовка сайта
    add_theme_support('title-tag');
    
    // Поддержка миниатюр записей
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1200, 800, true);
    
    // Размеры изображений
    add_image_size('kalinina-portrait', 600, 800, true);
    add_image_size('kalinina-landscape', 1200, 800, true);
    
    // Поддержка пользовательского логотипа
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    
    // Регистрация меню
    register_nav_menus(array(
        'primary' => __('Главное меню', 'kalinina-psy'),
        'footer'  => __('Меню в подвале', 'kalinina-psy'),
    ));
    
    // Поддержка HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Поддержка редактора блоков
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'kalinina_psy_setup');

// Регистрация виджетов
function kalinina_psy_widgets_init() {
    register_sidebar(array(
        'name'          => __('Сайдбар', 'kalinina-psy'),
        'id'            => 'sidebar-1',
        'description'   => __('Добавьте виджеты сюда', 'kalinina-psy'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'kalinina_psy_widgets_init');

// Длина excerpt
function kalinina_psy_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'kalinina_psy_excerpt_length');

// Кастомайзер
function kalinina_psy_customize_register($wp_customize) {
    // Секция контактов
    $wp_customize->add_section('kalinina_contacts', array(
        'title'    => __('Контактная информация', 'kalinina-psy'),
        'priority' => 30,
    ));
    
    // Телефон
    $wp_customize->add_setting('phone_number', array(
        'default'           => '+7 (900) 000-00-00',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('phone_number', array(
        'label'   => __('Телефон', 'kalinina-psy'),
        'section' => 'kalinina_contacts',
        'type'    => 'text',
    ));
    
    // Email
    $wp_customize->add_setting('email_address', array(
        'default'           => 'info@kalinina-psy.ru',
        'sanitize_callback' => 'sanitize_email',
    ));
    $wp_customize->add_control('email_address', array(
        'label'   => __('Email', 'kalinina-psy'),
        'section' => 'kalinina_contacts',
        'type'    => 'email',
    ));
    
    // Telegram
    $wp_customize->add_setting('telegram_handle', array(
        'default'           => '@yourhandle',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('telegram_handle', array(
        'label'   => __('Telegram', 'kalinina-psy'),
        'section' => 'kalinina_contacts',
        'type'    => 'text',
    ));
    
    // VK
    $wp_customize->add_setting('vk_url', array(
        'default'           => 'https://vk.com/yourpage',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('vk_url', array(
        'label'   => __('ВКонтакте URL', 'kalinina-psy'),
        'section' => 'kalinina_contacts',
        'type'    => 'url',
    ));
}
add_action('customize_register', 'kalinina_psy_customize_register');

// Добавление классов к body
function kalinina_psy_body_classes($classes) {
    if (!is_singular()) {
        $classes[] = 'hfeed';
    }
    return $classes;
}
add_filter('body_class', 'kalinina_psy_body_classes');

// Отключение emoji скриптов
function kalinina_psy_disable_emojis() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
}
add_action('init', 'kalinina_psy_disable_emojis');
?>