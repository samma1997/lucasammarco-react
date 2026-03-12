#!/usr/bin/env python3
"""
Genera JSON _elementor_data per articoli e geo-pages di lucasammarco.com
Replica la struttura del post di riferimento ID 1638 (Guida Midjourney)
"""

import json
import random
import string
import html
import re


def rand_id(length=7):
    """Genera un ID casuale alfanumerico di 7 caratteri (stile Elementor)."""
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))


def heading_widget(text, level="h2", anchor_id=None, animation="fadeIn"):
    settings = {
        "title": text,
        "header_size": level,
        "_animation": animation,
        "typography_typography": "custom",
        "typography_font_family": "Work Sans",
        "typography_font_weight": "600"
    }
    if anchor_id:
        settings["_element_id"] = anchor_id
    return {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "heading",
        "settings": settings,
        "elements": []
    }


def sanitize_html(html_content):
    """
    Sanitizza HTML per uso sicuro in JSON Elementor:
    - Rimuove newline letterali (i tag block HTML non ne hanno bisogno)
    - Normalizza whitespace
    - Rimuove single quotes dal CSS inline (problemi con wp_slash)
    - Rimuove paragrafi vuoti con solo whitespace/newlines
    """
    import re
    # Rimuovi paragrafi vuoti o con solo newlines
    html_content = re.sub(r'<p>\s*\\n\s*</p>', '', html_content)
    html_content = re.sub(r'<p>\s*\\n\\n\s*</p>', '', html_content)
    # Sostituisci newline letterali (\n come stringa) con spazio
    html_content = html_content.replace('\\n', ' ')
    # Sostituisci newline reali dentro HTML con spazio
    html_content = html_content.replace('\n', ' ').replace('\r', '')
    # Normalizza spazi multipli
    html_content = re.sub(r'  +', ' ', html_content)
    # Rimuovi single quotes dal CSS inline
    html_content = html_content.replace("font-family:'Work Sans'", "font-family:Work Sans")
    html_content = html_content.replace('font-family:"Work Sans"', "font-family:Work Sans")
    # Sostituisci escaped quotes nel HTML con normale HTML attribute quotes
    # href=\" -> href=" e \" -> " (cleanup da REST API encoding)
    html_content = html_content.replace('\\"', '"')
    # Rimuovi ogni backslash residuo (non devono esistere in HTML puro)
    html_content = html_content.replace('\\', '')
    return html_content.strip()


def text_editor_widget(html_content, animation="fadeIn"):
    return {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "text-editor",
        "settings": {
            "editor": sanitize_html(html_content),
            "_animation": animation,
            "typography_typography": "custom",
            "typography_font_family": "Work Sans"
        },
        "elements": []
    }


def container(elements, settings=None, css_classes=""):
    base_settings = {
        "content_width": "full",
        "padding": {"unit": "em", "top": "2", "right": "3", "bottom": "2", "left": "3", "isLinked": False},
        "padding_tablet": {"unit": "em", "top": "1.5", "right": "1.5", "bottom": "1.5", "left": "1.5", "isLinked": False},
        "padding_mobile": {"unit": "em", "top": "1", "right": "1", "bottom": "1", "left": "1", "isLinked": False}
    }
    if css_classes:
        base_settings["css_classes"] = css_classes
    if settings:
        base_settings.update(settings)
    return {
        "id": rand_id(),
        "elType": "container",
        "settings": base_settings,
        "elements": elements
    }


def sticky_sidebar_container(category_text, category_url):
    """Container sticky con bottoni (back to category, play/pause, WhatsApp, copy)."""
    back_btn = {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "button",
        "settings": {
            "text": category_text,
            "link": {"url": category_url, "is_external": "", "nofollow": "", "custom_attributes": ""},
            "typography_typography": "custom",
            "typography_font_family": "Work Sans",
            "typography_font_size": {"unit": "rem", "size": 1.125, "sizes": []},
            "typography_font_weight": "500",
            "button_text_color": "#000000",
            "background_color": "#EAFF9C",
            "border_border": "solid",
            "border_color": "#EAFF9C",
            "border_radius": {"unit": "px", "top": "100", "right": "100", "bottom": "100", "left": "100", "isLinked": True},
            "text_padding": {"unit": "rem", "top": "0.625", "right": "1.25", "bottom": "0.625", "left": "1.25", "isLinked": False},
            "align": "left",
            "_animation": "fadeIn",
            "selected_icon": {
                "value": {"url": "https://lucasammarco.com/wp-content/uploads/2025/01/arrow-button-icon-6-6-return.svg", "id": 3493},
                "library": "svg"
            },
            "icon_indent": {"unit": "px", "size": 20, "sizes": []},
            "button_background_hover_color": "#FFFFFF",
            "button_hover_border_color": "#FFFFFF"
        },
        "elements": []
    }

    play_icon = {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "icon",
        "settings": {
            "selected_icon": {
                "value": {"url": "https://lucasammarco.com/wp-content/uploads/2024/12/play-btn.svg", "id": 4822},
                "library": "svg"
            },
            "primary_color": "#FFFFFF00",
            "_element_id": "play-btn-icon-08",
            "size": {"unit": "px", "size": 49, "sizes": []},
            "_animation": "fadeIn"
        },
        "elements": []
    }

    pause_icon = {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "icon",
        "settings": {
            "selected_icon": {
                "value": {"url": "https://lucasammarco.com/wp-content/uploads/2024/12/pause-btn.svg", "id": 4823},
                "library": "svg"
            },
            "primary_color": "#FFFFFF00",
            "_element_id": "pause-btn-icon-08",
            "size": {"unit": "px", "size": 49, "sizes": []},
            "_animation": "fadeIn"
        },
        "elements": []
    }

    icons_container = {
        "id": rand_id(),
        "elType": "container",
        "settings": {
            "content_width": "full",
            "flex_direction": "row",
            "flex_justify_content": "flex-end",
            "flex_align_items": "center",
            "flex_gap": {"column": "1", "row": "0", "isLinked": False, "unit": "em", "size": 1},
            "padding": {"unit": "px", "top": "0", "right": "0", "bottom": "0", "left": "0", "isLinked": False},
            "animation": "fadeIn"
        },
        "elements": [play_icon, pause_icon]
    }

    main_sticky = {
        "id": rand_id(),
        "elType": "container",
        "settings": {
            "flex_direction": "row",
            "content_width": "full",
            "padding": {"unit": "vw", "top": "0.5", "right": "3", "bottom": "0.5", "left": "3", "isLinked": False},
            "padding_mobile": {"unit": "em", "top": "0.5", "right": "0", "bottom": "0.5", "left": "1", "isLinked": False},
            "flex_justify_content_laptop": "space-between",
            "flex_gap": {"column": "0", "row": "2", "isLinked": False, "unit": "em", "size": 0},
            "flex_align_items_mobile": "center",
            "background_background": "classic",
            "background_image": {
                "url": "https://lucasammarco.com/wp-content/uploads/2024/12/elementor-siti-web-sfondo-scaled.jpg",
                "id": 171,
                "size": "",
                "alt": "Sfondo per Home Page",
                "source": "library"
            },
            "sticky_offset": 90,
            "sticky_effects_offset": 1,
            "css_classes": "sliding-sticky-container",
            "margin": {"unit": "em", "top": "9", "right": "0", "bottom": "0", "left": "0", "isLinked": False}
        },
        "elements": [
            {
                "id": rand_id(),
                "elType": "container",
                "settings": {
                    "content_width": "full",
                    "padding": {"unit": "px", "top": "0", "right": "0", "bottom": "0", "left": "0", "isLinked": False}
                },
                "elements": [back_btn]
            },
            icons_container
        ]
    }

    return main_sticky


def header_container(post_date, title_h1, intro_html):
    """Container header con data, H1 e intro."""
    date_widget = {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "text-editor",
        "settings": {
            "editor": f'<p class="post-date" style="color:#888888;font-size:0.875rem;margin-bottom:0.5em;">{post_date}</p>',
            "_animation": "fadeIn"
        },
        "elements": []
    }

    h1_widget = {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "heading",
        "settings": {
            "title": title_h1,
            "header_size": "h1",
            "_animation": "fadeIn",
            "typography_typography": "custom",
            "typography_font_family": "Work Sans",
            "typography_font_weight": "700",
            "typography_font_size": {"unit": "rem", "size": 2.5, "sizes": []},
            "typography_font_size_tablet": {"unit": "rem", "size": 2, "sizes": []},
            "typography_font_size_mobile": {"unit": "rem", "size": 1.75, "sizes": []},
            "align": "left"
        },
        "elements": []
    }

    intro_widget = text_editor_widget(intro_html)

    return container(
        [date_widget, h1_widget, intro_widget],
        settings={
            "padding": {"unit": "vw", "top": "2", "right": "3", "bottom": "1", "left": "3", "isLinked": False},
            "padding_mobile": {"unit": "em", "top": "1", "right": "1", "bottom": "0.5", "left": "1", "isLinked": False}
        }
    )


def toc_accordion(sections):
    """
    Nested-accordion (Elementor Pro) con indice dei contenuti.
    Replica la struttura esatta del post di riferimento 1638.
    """
    links_html = '<ul style="list-style:none;padding:0;margin:0;">'
    for anchor, label in sections:
        links_html += f'<li style="margin-bottom:0.75em;"><a href="#{anchor}" style="color:#EAFF9C;text-decoration:none;font-family:Work Sans,sans-serif;">&#x2192; {label}</a></li>'
    links_html += '</ul>'

    # Inner container con il testo dei link (content del nested-accordion)
    inner_content = {
        "id": rand_id(),
        "elType": "container",
        "settings": {
            "_title": "Indice dei contenuti",
            "content_width": "full",
            "background_background": "classic",
            "background_color": "#1D1C20",
            "border_border": "none",
            "border_radius": {"unit": "px", "top": "8", "right": "8", "bottom": "8", "left": "8", "isLinked": True},
            "padding": {"unit": "em", "top": "1", "right": "2", "bottom": "1", "left": "2", "isLinked": False}
        },
        "elements": [
            {
                "id": rand_id(),
                "elType": "widget",
                "widgetType": "text-editor",
                "settings": {
                    "editor": links_html,
                    "_animation": "fadeIn"
                },
                "elements": []
            }
        ]
    }

    nested_accordion = {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "nested-accordion",
        "settings": {
            "items": [
                {
                    "item_title": "Indice dei contenuti",
                    "_id": rand_id()
                }
            ],
            "accordion_item_title_position_horizontal": "stretch",
            "accordion_item_title_icon_position": "end",
            "accordion_item_title_distance_from_content": {"unit": "em", "size": -2, "sizes": []},
            "accordion_item_title_distance_from_content_mobile_extra": {"unit": "em", "size": -2, "sizes": []},
            "accordion_item_title_distance_from_content_mobile": {"unit": "em", "size": -1, "sizes": []},
            "accordion_background_normal_background": "classic",
            "accordion_background_normal_color": "#1D1C20",
            "accordion_border_normal_border": "none",
            "accordion_background_hover_background": "classic",
            "accordion_background_hover_color": "#1D1C20",
            "accordion_border_hover_border": "none",
            "accordion_background_active_background": "classic",
            "accordion_background_active_color": "#1D1C20",
            "accordion_border_radius": {"unit": "px", "top": "8", "right": "8", "bottom": "8", "left": "8", "isLinked": True},
            "accordion_padding": {"unit": "em", "top": "1", "right": "3", "bottom": "1", "left": "3", "isLinked": False},
            "accordion_padding_widescreen": {"unit": "em", "top": "1", "right": "2", "bottom": "1", "left": "2", "isLinked": False},
            "accordion_padding_laptop": {"unit": "em", "top": "1", "right": "2", "bottom": "1", "left": "2", "isLinked": False},
            "accordion_padding_mobile_extra": {"unit": "em", "top": "1", "right": "2", "bottom": "1", "left": "2", "isLinked": False},
            "title_typography_typography": "custom",
            "title_typography_font_family": "Bricolage Grotesque",
            "title_typography_font_size": {"unit": "px", "size": 35, "sizes": []},
            "title_typography_font_size_tablet_extra": {"unit": "px", "size": 30, "sizes": []},
            "title_typography_font_size_tablet": {"unit": "px", "size": 25, "sizes": []},
            "title_typography_font_size_mobile_extra": {"unit": "px", "size": 25, "sizes": []},
            "normal_title_color": "#FFFFFF",
            "hover_title_color": "#FFFFFF",
            "active_title_color": "#FFFFFF",
            "_animation": "fadeIn"
        },
        "elements": [inner_content]
    }

    return container(
        [nested_accordion],
        settings={
            "background_background": "classic",
            "background_color": "#1D1C20",
            "padding": {"unit": "em", "top": "0", "right": "0", "bottom": "0", "left": "0", "isLinked": True},
            "border_radius": {"unit": "px", "top": "8", "right": "8", "bottom": "8", "left": "8", "isLinked": True},
            "margin": {"unit": "em", "top": "0", "right": "0", "bottom": "2", "left": "0", "isLinked": False}
        }
    )


def table_widget(table_html):
    """Widget per le tabelle con stile scuro."""
    styled_table = table_html.replace(
        '<table',
        '<table style="width:100%;border-collapse:collapse;background:#2E2E2E;color:#ffffff;"'
    ).replace('<th', '<th style="background:#484748;padding:12px;text-align:left;border:1px solid #555;"').replace(
        '<td', '<td style="padding:10px;border:1px solid #555;"'
    )
    return text_editor_widget(styled_table)


def cta_container():
    """Container CTA finale."""
    h2 = heading_widget("Hai bisogno di aiuto?", level="h2")
    text = text_editor_widget(
        '<p>Se hai domande o vuoi realizzare un progetto, sono qui per aiutarti. '
        'Offro una consulenza iniziale gratuita per capire le tue esigenze e trovare la soluzione migliore.</p>'
    )
    btn = {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "button",
        "settings": {
            "text": "Contattami Ora",
            "link": {"url": "https://lucasammarco.com/contatti/", "is_external": "", "nofollow": ""},
            "typography_typography": "custom",
            "typography_font_family": "Work Sans",
            "typography_font_weight": "600",
            "typography_font_size": {"unit": "rem", "size": 1.1, "sizes": []},
            "button_text_color": "#000000",
            "background_color": "#EAFF9C",
            "border_radius": {"unit": "px", "top": "100", "right": "100", "bottom": "100", "left": "100", "isLinked": True},
            "text_padding": {"unit": "rem", "top": "0.75", "right": "2", "bottom": "0.75", "left": "2", "isLinked": False},
            "align": "left",
            "_animation": "fadeIn",
            "button_background_hover_color": "#FFFFFF",
            "button_hover_border_color": "#FFFFFF"
        },
        "elements": []
    }

    return container(
        [h2, text, btn],
        settings={
            "background_background": "classic",
            "background_color": "#111111",
            "padding": {"unit": "em", "top": "3", "right": "3", "bottom": "3", "left": "3", "isLinked": False},
            "padding_mobile": {"unit": "em", "top": "2", "right": "1.5", "bottom": "2", "left": "1.5", "isLinked": False},
            "border_radius": {"unit": "px", "top": "12", "right": "12", "bottom": "12", "left": "12", "isLinked": True},
            "margin": {"unit": "em", "top": "3", "right": "0", "bottom": "0", "left": "0", "isLinked": False}
        }
    )


def parse_html_into_sections(html_content):
    """
    Parsa il contenuto HTML e lo divide in sezioni per heading.
    Restituisce lista di (tag, anchor_id, text, content_html).
    """
    sections = []
    # Split per H2 e H3
    parts = re.split(r'(<h[23][^>]*>.*?</h[23]>)', html_content, flags=re.DOTALL | re.IGNORECASE)

    current_intro = ""
    current_level = None
    current_title = ""
    current_anchor = ""
    current_content = ""

    for part in parts:
        h_match = re.match(r'<(h[23])[^>]*>(.*?)</h[23]>', part, re.IGNORECASE | re.DOTALL)
        if h_match:
            if current_intro and not current_level:
                sections.append(("intro", "", "", current_intro))
            elif current_level:
                sections.append((current_level, current_anchor, current_title, current_content))

            level = h_match.group(1).lower()
            title_raw = h_match.group(2)
            title_clean = re.sub(r'<[^>]+>', '', title_raw).strip()
            # Genera anchor dal titolo
            anchor = re.sub(r'[^a-z0-9-]', '', title_clean.lower().replace(' ', '-').replace("'", '')[:40])
            anchor = anchor.strip('-')

            current_level = level
            current_title = title_clean
            current_anchor = anchor
            current_content = ""
        else:
            if not current_level:
                current_intro += part
            else:
                current_content += part

    # Aggiungi l'ultima sezione
    if current_level:
        sections.append((current_level, current_anchor, current_title, current_content))
    elif current_intro:
        sections.append(("intro", "", "", current_intro))

    return sections


def build_content_elements(sections):
    """Costruisce i widget Elementor per ogni sezione del contenuto."""
    elements = []
    for level, anchor, title, content in sections:
        if level == "intro":
            if content.strip():
                elements.append(text_editor_widget(content.strip()))
        elif level == "h2":
            elements.append(heading_widget(title, level="h2", anchor_id=anchor))
            if content.strip():
                # Controlla se contiene tabelle
                if '<table' in content:
                    # Split per tabelle
                    table_parts = re.split(r'(<table[^>]*>.*?</table>)', content, flags=re.DOTALL | re.IGNORECASE)
                    for tp in table_parts:
                        if tp.strip():
                            if re.match(r'<table', tp, re.IGNORECASE):
                                elements.append(table_widget(tp))
                            else:
                                elements.append(text_editor_widget(tp.strip()))
                else:
                    elements.append(text_editor_widget(content.strip()))
        elif level == "h3":
            elements.append(heading_widget(title, level="h3", anchor_id=anchor))
            if content.strip():
                elements.append(text_editor_widget(content.strip()))

    return elements


def build_post_elementor_data(post_id, title, content_html, post_date="12 Marzo 2026", category_text="Blog", category_url="https://lucasammarco.com/blog/"):
    """
    Costruisce il JSON _elementor_data completo per un articolo (post).
    Include: sticky sidebar, header, content con accordion ToC, CTA.
    """
    sections = parse_html_into_sections(content_html)

    # Estrai intro (prima sezione)
    intro_html = ""
    content_sections = []
    for s in sections:
        if s[0] == "intro":
            intro_html = s[3]
        else:
            content_sections.append(s)

    # ToC: solo H2
    toc_items = [(s[1], s[2]) for s in content_sections if s[0] == "h2" and s[1]]

    # Container 1: Sticky sidebar
    sticky = sticky_sidebar_container(category_text, category_url)

    # Container 2: Header (data + H1 + intro)
    header = header_container(post_date, title, intro_html if intro_html else "<p></p>")

    # Container 3: Contenuto con ToC
    content_elements = []
    if toc_items:
        content_elements.append(toc_accordion(toc_items))

    content_body_elements = build_content_elements(content_sections)
    content_elements.extend(content_body_elements)

    content_cont = container(
        content_elements,
        settings={
            "padding": {"unit": "vw", "top": "2", "right": "3", "bottom": "3", "left": "3", "isLinked": False},
            "padding_mobile": {"unit": "em", "top": "1", "right": "1", "bottom": "2", "left": "1", "isLinked": False}
        }
    )

    # Container 4: CTA
    cta = cta_container()

    return [sticky, header, content_cont, cta]


def build_page_elementor_data(page_id, title, content_html):
    """
    Costruisce il JSON _elementor_data per una geo-page (page).
    Senza sticky sidebar, con H1, intro, sezioni, FAQ e CTA.
    """
    sections = parse_html_into_sections(content_html)

    intro_html = ""
    content_sections = []
    for s in sections:
        if s[0] == "intro":
            intro_html = s[3]
        else:
            content_sections.append(s)

    # ToC: solo H2
    toc_items = [(s[1], s[2]) for s in content_sections if s[0] == "h2" and s[1]]

    # Container 1: Header senza data
    h1_widget = {
        "id": rand_id(),
        "elType": "widget",
        "widgetType": "heading",
        "settings": {
            "title": title,
            "header_size": "h1",
            "_animation": "fadeIn",
            "typography_typography": "custom",
            "typography_font_family": "Work Sans",
            "typography_font_weight": "700",
            "typography_font_size": {"unit": "rem", "size": 2.5, "sizes": []},
            "typography_font_size_tablet": {"unit": "rem", "size": 2, "sizes": []},
            "typography_font_size_mobile": {"unit": "rem", "size": 1.75, "sizes": []},
            "align": "left"
        },
        "elements": []
    }

    intro_widget = text_editor_widget(intro_html if intro_html else "<p></p>")

    header = container(
        [h1_widget, intro_widget],
        settings={
            "padding": {"unit": "vw", "top": "10", "right": "3", "bottom": "2", "left": "3", "isLinked": False},
            "padding_tablet": {"unit": "em", "top": "8", "right": "2", "bottom": "1.5", "left": "2", "isLinked": False},
            "padding_mobile": {"unit": "em", "top": "6", "right": "1", "bottom": "1", "left": "1", "isLinked": False},
            "background_background": "classic",
            "background_image": {
                "url": "https://lucasammarco.com/wp-content/uploads/2024/12/elementor-siti-web-sfondo-scaled.jpg",
                "id": 171,
                "size": "",
                "alt": "Background Header",
                "source": "library"
            }
        }
    )

    # Container 2: Contenuto
    content_elements = []
    if toc_items:
        content_elements.append(toc_accordion(toc_items))
    content_body_elements = build_content_elements(content_sections)
    content_elements.extend(content_body_elements)

    content_cont = container(
        content_elements,
        settings={
            "padding": {"unit": "vw", "top": "2", "right": "3", "bottom": "3", "left": "3", "isLinked": False},
            "padding_mobile": {"unit": "em", "top": "1", "right": "1", "bottom": "2", "left": "1", "isLinked": False}
        }
    )

    # Container 3: CTA
    cta = cta_container()

    return [header, content_cont, cta]


# ============================================================
# DATI DEGLI ARTICOLI E PAGINE
# ============================================================

POSTS = {
    7221: {
        "title": "Come Creare un Sito Web Professionale | Guida Completa 2026",
        "type": "post",
        "date": "12 Marzo 2026",
        "category_text": "Blog",
        "category_url": "https://lucasammarco.com/blog/"
    },
    7222: {
        "title": "Quanto Costa un Sito Web nel 2026 | Prezzi Reali e Preventivo",
        "type": "post",
        "date": "12 Marzo 2026",
        "category_text": "Blog",
        "category_url": "https://lucasammarco.com/blog/"
    },
    7223: {
        "title": "Miglior CMS per Siti Web nel 2026 | Confronto Completo",
        "type": "post",
        "date": "12 Marzo 2026",
        "category_text": "Blog",
        "category_url": "https://lucasammarco.com/blog/"
    }
}

GEO_PAGES = {
    7224: {"title": "Web Developer Torino | Realizzazione Siti Web Torino", "city": "Torino"},
    7225: {"title": "Web Developer Napoli | Realizzazione Siti Web Napoli", "city": "Napoli"},
    7226: {"title": "Web Developer Firenze | Realizzazione Siti Web Firenze", "city": "Firenze"},
    7227: {"title": "Web Developer Bologna | Realizzazione Siti Web Bologna", "city": "Bologna"},
    7228: {"title": "Web Developer Brescia | Realizzazione Siti Web Brescia", "city": "Brescia"},
    7229: {"title": "Web Developer Genova | Realizzazione Siti Web Genova", "city": "Genova"},
    7230: {"title": "Web Developer Bari | Realizzazione Siti Web Bari", "city": "Bari"},
    7231: {"title": "Web Developer Palermo | Realizzazione Siti Web Palermo", "city": "Palermo"}
}


if __name__ == "__main__":
    import sys
    import os

    output_dir = "/Users/mac/lucasammarco-react/elementor-migration/json"
    os.makedirs(output_dir, exist_ok=True)

    print("Generating Elementor JSON files...")

    # Genera post 7221 (Come Creare un Sito Web)
    content_7221 = open("/tmp/content_7221.html").read()
    data_7221 = build_post_elementor_data(
        7221,
        POSTS[7221]["title"],
        content_7221,
        POSTS[7221]["date"],
        POSTS[7221]["category_text"],
        POSTS[7221]["category_url"]
    )
    with open(f"{output_dir}/post_7221.json", "w", encoding="utf-8") as f:
        json.dump(data_7221, f, ensure_ascii=False, indent=2)
    print(f"Generated post_7221.json ({len(json.dumps(data_7221))} bytes)")

    # Genera post 7222
    content_7222 = open("/tmp/content_7222.html").read()
    data_7222 = build_post_elementor_data(
        7222,
        POSTS[7222]["title"],
        content_7222,
        POSTS[7222]["date"],
        POSTS[7222]["category_text"],
        POSTS[7222]["category_url"]
    )
    with open(f"{output_dir}/post_7222.json", "w", encoding="utf-8") as f:
        json.dump(data_7222, f, ensure_ascii=False, indent=2)
    print(f"Generated post_7222.json ({len(json.dumps(data_7222))} bytes)")

    # Genera post 7223
    content_7223 = open("/tmp/content_7223.html").read()
    data_7223 = build_post_elementor_data(
        7223,
        POSTS[7223]["title"],
        content_7223,
        POSTS[7223]["date"],
        POSTS[7223]["category_text"],
        POSTS[7223]["category_url"]
    )
    with open(f"{output_dir}/post_7223.json", "w", encoding="utf-8") as f:
        json.dump(data_7223, f, ensure_ascii=False, indent=2)
    print(f"Generated post_7223.json ({len(json.dumps(data_7223))} bytes)")

    # Genera geo-pages
    for page_id, info in GEO_PAGES.items():
        content = open(f"/tmp/content_{page_id}.html").read()
        data = build_page_elementor_data(page_id, info["title"], content)
        with open(f"{output_dir}/page_{page_id}.json", "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Generated page_{page_id}.json - {info['city']} ({len(json.dumps(data))} bytes)")

    print("\nAll JSON files generated successfully!")
