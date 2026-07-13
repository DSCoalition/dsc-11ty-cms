---
layout: layouts/base.liquid
permalink: /careers/
seo_data:
  title: Digital Services Coalition - Careers
  desc: Apply to join our team below.
  url: https://digitalservicescoalition.org/careers/
  img: /assets/img/dsc-logo.png
  img_alt: Digital Services Coalition Logo
doverCareersUrl: "https://app.dover.com/jobs/digitalservicescoalition"
doverEmbedUrl: "https://app.dover.com/jobs/digitalservicescoalition?embed=1"
---

{% assign dover_careers_url = doverCareersUrl | default: "" | strip %}
{% assign dover_embed_url = doverEmbedUrl | default: dover_careers_url | default: "" | strip %}
{% assign has_valid_dover_embed_url = false %}
{% if dover_embed_url != "" %}
  {% if dover_embed_url contains "https://" or dover_embed_url contains "http://" %}
    {% assign has_valid_dover_embed_url = true %}
  {% endif %}
{% endif %}

<section>
  <div class="container mx-auto p-4 md:p-12 2xl:max-w-[75rem]">
    <div class="p-4 lg:px-12">
    <h1 class="text-magenta leading-tight mb-4">Careers</h1>
    <p class="text-gray mb-4">Apply to join our team below.</p>

        {% if has_valid_dover_embed_url %}
        {% if dover_careers_url != "" %}
    <p class="text-gray">Prefer a direct link? <a class="underline" href="{{ dover_careers_url | escape }}" target="_blank" rel="noopener">View all open roles on Dover</a>.</p>
        {% endif %}
    <div class="my-6 w-full" style="position: relative; padding-top: 56.25%;">
            <iframe
            src="{{ dover_embed_url | escape }}"
                title="Job application"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;">
            </iframe>
        </div>
        {% if dover_careers_url != "" %}
    <p class="text-gray mt-3">If the embedded listings do not load, <a class="underline" href="{{ dover_careers_url | escape }}" target="_blank" rel="noopener">open careers in Dover</a>.</p>
        {% endif %}
        {% else %}
        <div class="my-4 p-4" style="border: 1px solid #f9f7f6;">
            <p class="text-gray mb-0">No active careers listing is available right now.</p>
        </div>
        {% endif %}
    </div>
    </div>
</section>
