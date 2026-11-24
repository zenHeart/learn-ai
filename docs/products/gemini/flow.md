---
title: Google Flow
description: "Google's AI creative studio. Generate short clips, a few seconds to a dozen or so long, from an English prompt, then arrange them into a finished film in Scenebuilder. This page explains whether you can use it, how to make a first video in 10 minutes, how credits are charged and how to avoid the common pitfalls."
domain: product
tags:
  - coding-agent
role: tutorial
pageClass: wide-figures
---

# Google Flow

> Google's AI creative studio (the official name is **AI creative studio**). It solves this problem: a frontend engineer needs a video for a landing page, a product launch or an internal review, but has never shot footage and does not want to learn editing software. In Flow, you write one English description, generate a clip of a few seconds to a dozen or so, then arrange the clips into a finished film.
>
> It **does not write code**. Use it for landing-page films, product demo videos and storyboards; for a page you can click, use [Canvas](./canvas).
>
> Entry point: [labs.google/fx/tools/flow](https://labs.google/fx/tools/flow). Help centre: [support.google.com/flow](https://support.google.com/flow).

The UI steps, credits and region information on this page were checked page by page against the official help centre **as of 2026-11-24**. These details change; trust what your own interface shows.

| Item | Description |
|---|---|
| **Who it is for** | Engineers who write frontend code, have never made a video and have not used a generative video tool |
| **Prerequisites** | A Google account; 18 or older and age-verified; located in an officially supported country or region; a Chromium-based browser such as Chrome or Edge on your computer |
| **Non-goals** | No editing software; no Veo / Imagen API calls, which are the business of [AI Studio](./ai-studio); no Flow Music, which makes songs and music videos and has a separate credit system |

## What you will be able to do

- Decide **whether you can use it**: what each of the three requirements, age, region and plan, asks for.
- **Make a first video in 10 minutes** and download it as a file.
- **Pick the right generation mode** by what you have to hand: only a sentence, one image, character reference images, or an existing video.
- Use Character, ingredients and start and end frames to **keep characters and scenes consistent across clips**, then arrange the clips into a finished film in Scenebuilder.
- **Understand how credits are charged** and recognise the common errors: which step spends credits and which does not, and which official statement covers each pitfall.

## Can you use it: age, region, language, plan

Google's official pages list three conditions: age verified and 18 or older; being in a supported region; and, to use some features, a Google AI subscription. Each in turn.

### Age: 18 or older, and age-verified

The help centre's own words: "Make sure your age is verified. You must be 18 years of age or older." Age verification is attached to your Google account.

### Region: mainland China is not on the list; Hong Kong, Macau and Taiwan are

[Where you can use Google Flow](https://support.google.com/flow/answer/16353544) says: "You can use the Google Flow Desktop platform and download the Google Flow mobile app in these countries and regions." As of 2026-11-24, that page lists the supported countries and regions in alphabetical order.

| Where I am | On the supported list | Evidence (wording on the official page) |
|---|---|---|
| Mainland China | **Not on it** | The list is alphabetical and goes from `Chile` straight to `Colombia`; `China` does not appear anywhere on the page |
| Hong Kong | **On it** | `Hong Kong` |
| Macau | **On it** | `Macau` |
| Taiwan | **On it** | `Taiwan` |

Two related official statements:

- **A VPN does not help**: "VPNs will not enable access in unsupported regions."
- **Buying AI Pro does not guarantee access**: "Google Flow is not currently available in all countries where Google AI Pro is offered." Google suggests checking the supported list before you buy a subscription.

Some features are also restricted by region. The same page states:

| Feature | Regions where it is not available |
|---|---|
| Editing an uploaded video | European Economic Area (EEA), Switzerland, the United Kingdom |
| Avatar (a model of your own likeness) | European Economic Area (EEA), Switzerland, the United Kingdom |
| Buying AI credits | Japan |

### Language: the interface has Simplified and Traditional Chinese; English is recommended for prompts

The official page says "Google Flow is currently available in these languages", and the list includes `Chinese (Simplified & Traditional)` and `Cantonese`. The interface language follows your Google Account settings: "You can update your preferred language in your Google Account settings."

For prompts, the official wording is a recommendation to use English, not a rule that English is the only option: "For best results with our tools, we recommend using English prompts. While some of our products may support prompts in other languages, the quality of the generated output may vary depending on the language and complexity of the prompt."

> An earlier version of this page said "You can only prompt Flow in English, and the replies are in English too", and cited the [Google AI Pro benefits page](https://support.google.com/googleone/answer/14534406). Checked on 2026-11-24: that sentence ("Only English is supported for prompts and instructions") belongs to the **Google Antigravity** section of that page, not to Flow. Flow's own pages say only "recommend English".

### Plan: you can try it without a subscription

| Plan | What you can use | Flow credits (as of 2026-11-24) |
|---|---|---|
| No subscription | Basic video generation and editing. Omni Flash 1.2 generates 3 to 10 seconds; Veo 3.1 Lite generates 4, 6 or 8 seconds | 50 per day |
| Google AI Plus / Pro / Ultra (two Ultra tiers) | All features. Omni Flash 1.2 generates 3 to 15 seconds; Omni Extend; upscaling from 360p to 1080p (4K on Ultra only); creating and remixing Tools | 50 per day, plus 200 / 1,000 / 10,000 / 25,000 per month (Plus, Pro, then the two Ultra tiers) |
| Eligible Workspace plans | Official wording: "get access at no extra charge to Google Flow with 50 daily credits" | 50 per day |

For the Workspace row, the plans Google lists are Business Starter / Standard / Plus, Enterprise Starter / Standard / Plus, G Suite Legacy Free Edition, Education Standard / Plus and Google AI Pro for Education.

Not subscribing comes with one restriction: during peak hours (officially "roughly 2 PM to 5 PM UTC", which is 22:00 to 01:00 the next day Beijing time) you may be unable to generate videos. You can still generate images and use Agent then.

### Where to use it: the desktop web version has the most features

- The **desktop web version** has the most features. Official: "For the most powerful editing features, go to Google Flow on a computer."
- The **mobile app** is for creating on the go. Official: "For creation on the go, download the Google Flow app."
- **Features found only on the web version**: Frames to Video and Omni Extend on Omni Flash 1.2 (both marked officially "Currently only available at Google Flow on web"); Tools ("Tools are currently available on web & PC only").
- **Browser**: use a Chromium-based one; Google's examples are Google Chrome or Edge. Google warns that other browsers and mobile "are not yet fully optimized", so you may hit bugs.

## Core concepts

Start with the vocabulary. The left column holds the terms you will meet in the interface and the help centre.

| Term | One-line explanation | Why you need it |
|---|---|---|
| **project** | A container that holds all the assets for one film | Assets, Agent sessions and Tools are all stored per project; switching project means switching film |
| **asset** | Each image and each video generated in or uploaded to the project | Adding to a prompt, placing on the timeline and downloading all work at the level of the asset |
| **generation** | One triggered model call | Credits are charged per generation, not per click |
| **take** | One generation may return several results; each result is one candidate | More candidates give you more room to choose, and the credit charge multiplies too |
| **frame** | A single image in a video; the start frame and the end frame decide where a video begins and ends | To make the end of shot A meet the start of shot B, you rely on frames |
| **ingredients** | Reference images or reference videos handed to the model together with the prompt | Keeps the same person or the same object looking the same across shots |
| **character** | A bundled set of visual and audio references that has been given a name | No need to upload the same batch of images again every time |
| **Scenebuilder** | The place where several clips are arranged into one timeline | A single clip runs only a few seconds to a dozen or so; the finished film is assembled here |
| **scene** | A sequence of clips arranged in Scenebuilder | Preview and download both work at the level of the scene |
| **Extend** | Adds a few more seconds after a video | When a good shot is too short, you do not have to redo the whole clip |
| **Jump to** | Moves a character or object into a new setting without changing its appearance | The same character changes location without a new description |
| **aspect ratio** | The width-to-height ratio of the picture | A landing-page banner and a portrait phone screen need different ratios |
| **resolution** | 360p drafts and 720p as standard, then scalable to 1080p or 4K | 360p is cheap and suits testing the composition first |
| **credits** | The allowance charged when you generate a video | Decides how many shots you can make in a given period |
| **Tools** | Small tools that you describe in natural language and Flow generates by writing code | Repetitive jobs such as caption bars and changing the aspect ratio |
| **Agent** | The conversational assistant in the prompt box | Helps you write prompts, list shots and produce candidates in batches |

A few that are easy to confuse, spelled out below.

### project and asset

To create a project, click **+ New project**. The left sidebar lets you find assets by type: All media, Images, Videos, Characters, Scenes, Uploads. Assets can be dragged into a **Collection** (like a folder, and it can be nested).

### generation and take

The official blog has used the word take ("the first take isn't the final one"), but the steps in the help centre say output (`Number of outputs you want`). The credits page stresses one sentence: "The Google Flow/AI credit costs below are per generation, not per request. Some product features will create multiple generations per request. For example, in Google Flow, you can make a single request that may generate 2 videos." In other words, asking for 2 candidates costs the credits of 2 generations.

### frame

The interface text for the start frame is **+ Add start frame.** and for the end frame it is **+ Add end frame.** You can also pull a frame out of a video: pause on a frame, hover and click **Save frame**.

### ingredients and character

Official statement on ingredients: "You can consistently use the same images for your character and key objects from one clip to the next with the use of ingredients."

Official statement on character: "You can bundle specific visual and audio references into a single, reusable character. Your character's face, clothing, and voice remain strictly consistent across multiple generations without needing to upload the same images every time."

The difference: ingredients are references you attach **each time you generate**; a character is a bundled reference you **create once and refer to again and again**. Type `@` followed by the character's name in the prompt to refer to it.

### Scenebuilder, Extend and Jump to

The Scenebuilder capabilities Google lists: arranging several clips, changing their order, trimming the start and end of each clip with handles, previewing the whole sequence and downloading the scene. The official blog calls it "your in-Flow storyboard, where you assemble individual clips into a complete narrative".

Official statement on Extend: "If you need a scene to be longer, you can create more footage and add it to the end of your original clip."

Only the official blog has defined Jump to (2025-06-25): "Transition a character or object to a completely new setting while preserving their appearance from the previous shot."

<!-- TODO: needs verification — whether Jump to is still available in the current product, and where its entry point is. Checked: none of the 16 articles in the help centre (live version, 2026-11-24) mentions Jump to; only the official blog post flow-video-tips (2025-06-25) defines it, and at the time it was described as available on Veo 2 only. Not confirmed in the product -->

### aspect ratio and resolution

The help centre's models page says "Both aspect ratios" for every mode, without naming which two. The official launch post for Veo 3.1 Lite says the model "offers flexible framing for landscape (16:9) and portrait (9:16) ratios".

<!-- TODO: needs verification — which two ratios "Both aspect ratios" refers to in the Flow interface. Checked: help centre articles 16352836, 16353334 and 16526234, and the blog post veo-3-1-lite; the help centre says only "both", and 16:9 and 9:16 are an inference from the model's launch post. Not confirmed in the product -->

For resolution, Omni Flash can produce drafts at 360p, and Google writes that its credits are one third of those at 720p. Subscribers can upscale 360p to 1080p, and Ultra subscribers can go up to 4K.

### Tools and Agent

- **Tools**: the official definition is "Build custom, reusable tools and mini-apps using natural language in Google Flow". Flow ships with a set of prebuilt Tools provided by Google.
- **Agent**: the official definition is "a built-in creative collaborator", which helps you sort out ideas, revise prompts and steer the generation process through natural conversation.

## How it works

Read the next diagram with this question in mind: the sentence I type and the reference image I supply — which model takes over each of them, and how do they end up as a clip on the timeline?

<DocDiagram src="/diagrams/google-flow-pipeline.en.svg" alt="This diagram runs left to right in four stages and answers one question: when you type a sentence or supply a reference image, which model takes it, and how does it become a clip on the timeline? Stage 1 is input, three things: the text prompt, frames (a start frame and an end frame), and ingredients (characters, scenes, objects). Stage 2 is the models. There are two video models, Omni Flash from Gemini Omni and Veo 3.1 Lite from Veo 3.1. They generate and edit video and support conversational iteration, and every generation spends credits, counted per second or per generation. The image models are the Nano Banana family (Pro, 2.1, 2 Lite). They generate and edit images, spend no credits, and follow a daily cap instead. Stage 3 is output: the video models produce candidate clips, and the image models produce images. Stage 4 is the finished film, which is the Scenebuilder timeline. There are six sets of connections. First, the text prompt goes straight into the video models. Second, frames and ingredients can enter the video models together with the same generation. Third, the video models produce candidate clips, and the image models produce images. Fourth, the arrow from candidate clips to Scenebuilder is labelled Add to Scene: only the candidates you pick enter the timeline; the ones you do not pick never do. Fifth, a dashed line along the bottom runs left from the output images back to the input: a generated image can be reused as the start frame, end frame, or ingredient of a later video generation. Sixth, the two-headed dashed line along the top, between the models and Scenebuilder, is Extend: it goes from the end of an existing clip back to the video models, and the continuation it generates returns to the timeline. Inside Scenebuilder, clips sit in order; you can drag them into a different order and trim their start and end. This diagram leaves out which models support which generation mode, because one mode is usually supported by several models, so input is not drawn as one-to-one with any model. It also leaves out specific credit amounts, API call paths, and Flow Music, whose credit system is separate." :width="1080" lang="en" />

> **What the diagram is based on:** The four-stage split and the objects in each stage come from three help centre articles, [Create videos](https://support.google.com/flow/answer/16353334), [Edit & build scenes](https://support.google.com/flow/answer/16935718) and [Credits & per-generation cost](https://support.google.com/flow/answer/16526234). Model names follow the [official models page](https://support.google.com/flow/answer/16352836), as of 2026-11-24. The diagram keeps the objects of the four stages, the direction of the six sets of connections, and the rule that credits are charged only at the video-model layer. It leaves out which models each generation mode supports (one mode is usually supported by several models, so input is not drawn as one-to-one with the models), the specific credit amounts, API call paths, and Flow Music, whose credit system is separate. Solid lines are the main path of one generation; dashed lines are reuse and Extend.

Four relationships in the diagram are worth remembering:

1. **The input decides the path**. With text only, it goes straight to the video models. With a reference image, the image can serve as a frame or as an ingredient and enter the video models together with the same generation.
2. **Images are raw material for video**. An image generated by Nano Banana can be used directly as the ingredient, start frame or end frame of a later video generation. Google says these image models exist to "create frames and ingredients for your projects"; frames pulled out of a video work the same way.
3. **There is more than one model, and credits are charged at the model layer**. Videos are generated by Omni Flash 1.2 or Veo 3.1 Lite and cost credits; images are generated by the Nano Banana family and do not.
4. **The finished film takes shape in Scenebuilder**. The candidate clips from each generation first land in the project; only the ones you pick go onto the timeline.

## Make your first video in 10 minutes

Goal: make an 8-second, 720p video from scratch and download it. By the official credits page, this step costs **24 credits** (Omni Flash 1.2 at 720p is 3 credits per second). The day's 50 credits are enough.

### Step 1: Open Flow and create a project

- **What to do**: open [Flow](https://labs.google/fx/tools/flow) in Chrome or Edge, sign in with your Google account (age, region and credits are all tied to the account), then click **+ New project**.
- **What you will see**: an empty project and a prompt box.
- **Why**: assets are stored per project. On a first run you do not need to create a character or upload reference images beforehand.

### Step 2: Write a one-sentence prompt

- **What to do**: describe the scene in English in the prompt box. Google asks you to be clear about five things: "Be specific about the subject, action, environment, lighting, and style." The example below was written by this site; it is not official text:

```text
A slow wide shot of a dark studio desk at night. A slim laptop in the center
shows a plain dark dashboard with soft blue charts. A warm desk lamp on the
left lights the keyboard; the rest of the room falls into soft shadow. Fine
dust drifts in the light. The camera pushes in very slowly. No people, no text.
```

- **What you will see**: your text in the prompt box.
- **Why**: this is Text to video mode, and one sentence is enough to get started.

### Step 3: Switch to video and choose the settings

- **What to do**: click the model name, click **Video**, then choose four settings: **Aspect ratio**, **Number of outputs you want** (choose 1 the first time), **The model you want to use** (choose Omni Flash 1.2) and **Generation length** (choose 8 seconds).
- **What you will see**: these four video settings appear in the prompt box.
- **Why**: Google writes "By default, Google Flow sets the model to Nano Banana Pro". The default is an image model, so without switching you generate an image. Double the number of candidates and the credit charge doubles too.

### Step 4: Generate and wait for the result

- **What to do**: click **Generate**.
- **What you will see**: the results appear in the project grid as individual cards (official: "your generations now appear as individual tiles"). While you wait, a card may show **Pending**.
- **Why**: take a first look at what was generated before deciding whether to continue.
- **If you get stuck**: if a Pending or error card stays where it is, check the system notifications in the top right corner. Google states that generations that failed because of a policy or a credit limit need to be retried or deleted by hand.

### Step 5: Pick one to keep

- **What to do**: if you are happy with it, keep it. The first generation is already in the project by itself; the help centre has no separate save button for it.
- **What you will see**: select **Videos** in the left sidebar and you will find the video.
- **Why**: **Save to Project** is for a different case. You have edited the video and want to keep one of the older versions: open the video, hover over the version in the **History** panel on the right, and click **Save to Project**. Google states that an older version must be saved before it can go into Scenebuilder.

### Step 6: Download

- **What to do**: hover over the asset, click **More**, then **Download**, and choose the file type. For a GIF, choose **270p**.
- **What you will see**: the browser downloads a video file or a GIF.
- **Why**: the finished clip has to go into your web page or your presentation, and downloading is the way out of Flow.

**What this cost**: go back to the top right corner and click your profile picture; your remaining credits sit under it; 8 seconds at 720p should have used up 24 credits. Two ways to spend less: switch to Veo 3.1 Lite, where one generation is 10 credits (non-Ultra); or drop Omni Flash 1.2 to 360p, where 8 seconds is 8 credits. When you dislike the result, change the prompt first instead of retrying again and again. A retry is simply another generation, and it is charged as usual.

## Use each generation mode

The [Google AI Pro benefits page](https://support.google.com/googleone/answer/14534406) lists these modes: Text to video, Ingredients to video, Frames to video, Text to image and Image to image. The help centre's models page adds Video to Video editing and Extend videos (Omni Extend). The landing page spells the last two as Video Extension and Video-to-video editing. The subheadings on this page follow the help centre's names.

Start with an overview table, then go through the modes one at a time. The content comes from [Learn about Google Flow models & supported features](https://support.google.com/flow/answer/16352836), as of 2026-11-24.

| Mode | What you have | Omni Flash 1.2 | Veo 3.1 Lite |
|---|---|---|---|
| Text to video | A sentence of description | Supported, 3 to 10 seconds (up to 15 with a subscription) | Supported, 4, 6 or 8 seconds |
| Frames to video | A start frame, or a start frame and an end frame | Supported, 3 to 10 seconds; web only | Supported; with a start frame only, or with both a start and an end frame |
| Ingredients to video | Reference images of a character or an object | Supported, 3 to 10 seconds | Supported, 8 seconds only |
| Video to video | An existing video | Supported, 3 to 10 seconds | Not supported |
| Video extension | A video that has already been generated | Supported, extends by 3 to 10 seconds; subscription required; web only | Not supported |

Veo 3.1 Fast, Veo 3.1 Quality and Omni Flash 1.1 **retire on 2026-12-05**. Google advises starting new projects directly on Omni Flash 1.2 or Veo 3.1 Lite.

### Text to video

- **Good for**: starting a shot from zero, with no reference at all.
- **Prepare**: one English description that is clear about the subject, action, environment, lighting and style.
- **Steps**: see Steps 2 to 4 in the previous section.
- **How to write the prompt**: see "How to write prompts" at the end of this section.
- **Common failure**: several candidates come out at once and the credit charge multiplies. Set **Number of outputs you want** to 1.

### Frames to video

- **Good for**: you have one image (a design mock-up, a screenshot, a frame from the previous clip) and want to set it in motion; or you want to control both the beginning and the end of a video.
- **Prepare**: one image as the start frame; to control the end as well, prepare a second image as the end frame. Official reminder: "Product feature availability may differ by country/region of use. Certain image types may not be supported."
- **Steps** (official steps):
  1. In the project's prompt box, click the model name.
  2. Click **Video**, then **Frames**.
  3. Drag the image onto **+ Add start frame.** For an end frame, drag another image onto **+ Add end frame.**
  4. In the prompt, describe the action or transition that happens between the two frames.
  5. Choose the video settings and click **Generate**.
- **How to write the prompt**: focus on "how things change" and do not restate the static content already in the image. For an example, see the "Product demo" template.
- **Common failure**: you cannot find Frames in the mobile app. Frames to Video on Omni Flash 1.2 is currently offered on the web version only.

### Ingredients to video

- **Good for**: several shots that need the same person, the same object or the same scene.
- **Prepare**: reference images. Google suggests images of the subject or product **on a plain or a segmented (cut-out) background** ("provide subject or product references on a plain or segmented background"); keep other people out of scene and style reference images.
- **Steps** (official steps):
  1. In the prompt box, click the model name.
  2. Click **Video**, then **Ingredients**.
  3. Add reference material; choose one of four ways: drag reference images or reference videos into Flow from your device; type `@` followed by the asset name in the prompt box to use an asset already in the project; click **Add** and pick an asset from the project; click **Add**, then **Upload media**, to upload a file.
  4. State in the prompt how each reference is to be used. Official example: the references are a woman, a lava lamp and a foggy street, and the prompt is `The woman, whose torso is the lava lamp, walks down the foggy street`.
  5. Choose the video settings and click **Generate**.
- **How to write the prompt**: the text has to work with the reference images, not contradict them, and it has to point to the material you supplied. Official: "Your text prompt should complement, not contradict, your visual inputs."
- **Common failures**:
  - You chose a length other than 8 seconds with Veo 3.1 Lite. On that model, Ingredients supports only 8 seconds.
  - You added a voice reference and got an error. Official: "You can add voice references only to video generations that use ingredients." The entry point is **Add**, then **Voices**, under the Omni Flash model.
  - The character still changed. Switch to Character instead; see the next section.

### Text to image

- **Good for**: producing the key stills first to fix the character, the scene and the composition, then using them as frames or reference material for video.
- **Prepare**: one description of the image.
- **Steps** (official steps): enter the project, click the model name, click **Image**, choose **Image aspect ratio**, **Number of outputs you want** and the model, write the prompt, optionally add ingredients, and click **Generate**.
- **How to write the prompt**: Google only asks that it "describes the image you want to create in detail".
- **Common failure**: assuming that generating images costs credits. Official: "Generating and upscaling images in Google Flow does not currently use your monthly Google Flow credits or AI credits." Images follow a daily cap instead; see "Credits" later on this page.

### Image to image

- **Good for**: you already have an image and want to change its background, change its style or crop it.
- **Prepare**: the image in the project.
- **Steps**, two official paths:
  1. Edit the image in conversation. Open **Agent**, drag the images into the prompt box (several at a time is fine), write what to change, and click **Generate**. Official example prompt: `Make these black and white.` The changes are saved automatically to that asset's version stack.
  2. Crop. Open the image, click **Crop** on the left, choose the crop area, and click **Crop**.
- **To refer to another image in the project**: hover over that image, click **More**, then **Add to prompt**.
- **Common failure**: you cannot find the old image after editing. It is not lost; the **History** panel on the right holds every previous version and the prompt used at the time.

<!-- TODO: needs verification — whether the two image-editing entry points, Select (selection editing) and Draw (freehand drawing), still exist. Checked: the official blog post flow-updates-february-2026 (2026-02-25) announced lasso selection and freehand drawing; the cached version of help centre article 16729550 lists Select and Draw, but the live version on 2026-11-24 keeps Crop only. Not confirmed in the product -->

### Video to video

- **Good for**: you have a video that you shot or generated, and want to change the lighting, add something or swap the background.
- **Prepare**: a `.mov`, `.mp4`, `.avi` or `.wmv` file of at most 60 seconds and 1 GB. Anything over 30 seconds must be trimmed to 30 seconds or less inside Flow.
- **Steps** (three official steps):
  1. Set the video model to Omni Flash 1.2. Open the generation settings at the bottom of the prompt box, click **Video**, click the video model and choose **Omni Flash 1.2**.
  2. Upload, drag in or select the video. Google states that Flow processes it, converts the format and runs a safety check automatically.
  3. Click the video you want to edit, select a segment of up to 10 seconds in the trimming window (up to 15 seconds for Plus / Pro / Ultra subscribers), write the prompt, optionally add ingredients, and click **Generate**. You can then add further prompts or ingredients, with up to 3 rounds of conversation that keep the context.
- **How to write the prompt**: write only what to change and keep the rest. Official examples: `Change the lighting to a cinematic sunset`, `Add a text overlay that says 'Coming Soon'`.
- **Common failures**:
  - You are told that your region is not supported. Google writes that the feature is "only available in certain countries".
  - You cannot change what a person says. In all regions, Google does not support editing or generating the speech of people in an uploaded video; changing lines, adding dialogue and dubbing are all out. To make the person speak, use a prompt to generate a new clip.
  - The credit charge is larger than you expected. Official: "Edits cost the same credits per second as standard generations."

### Video extension

- **Good for**: a shot that is good but too short.
- **Prepare**: a Google AI Plus, Pro or Ultra subscription; the video you want to extend; optionally up to 3 reference images.
- **Steps** (official steps): enter the project, click the clip you want to extend, click **Extend** at the bottom, choose the extension length, describe in the prompt box how the action continues, optionally add up to 3 image references to keep characters and the environment consistent, and click **Generate**.
- **How to write the prompt**: write the action that comes next. The official blog explained the principle: "It analyzes the final frames and continues the action".
- **Common failures**:
  - The button does not work. Official: "This feature is only available to Google AI Plus, Pro & Ultra subscribers on the Omni Flash 1.2 model." Veo Extend retired on 2026-11-05.
  - An extended clip can no longer be edited with insert, remove, camera and similar edits.
  - Credits are charged per added second: 1 credit per second at 360p, 3 credits per second at 720p.

### How to write prompts: official principles

The section "Best practices & advanced tips when generating in Google Flow" of the help centre article [Create videos in Google Flow](https://support.google.com/flow/answer/16353334) lists three:

1. **Prepare clean ingredients**. Put subject or product references on a plain or a cut-out background; keep extra people out of scene and style references unless you want them.
2. **Avoid conflicting guidance**. The text prompt should add to the images you supply, never override them; the prompt has to point to the frames or reference material you gave; when all the references look consistent, the model blends them more easily.
3. **Iterate with Gemini**. Send your prompts, images or even videos to Gemini and have it rewrite the prompt and branch out with ideas.

The official blog post [5 tips for getting started with Flow](https://blog.google/innovation-and-ai/products/flow-video-tips/) (2025-06-25) adds the elements a prompt should contain:

- **Subject and action**: who or what, doing what.
- **Composition and camera motion**: use `wide shot` or `close-up` to set the shot size, and `tracking shot` or `aerial view` to set the camera movement.
- **Location and lighting**: do not write only "a room"; write where the light comes from and what falls into shadow.
- **Alternative styles**: you can specify styles such as `stop motion` or `clay animation`.
- When you have Gemini write several shots that lead into each other, tell it explicitly to repeat every key detail from the earlier prompts.

### How to write prompts: three templates

All three prompts below are **examples written by this site**, not official text. They share one structure: subject, action, environment, lighting, style, exclusions. Replace the parts item by item, following the table under each prompt.

**Template 1: Landing-page film**

```text
A slow wide shot of a dark studio desk at night. A slim laptop in the center
shows a plain dark dashboard with soft blue charts. A warm desk lamp on the
left lights the keyboard; the rest of the room falls into soft shadow. Fine
dust drifts in the light. The camera pushes in very slowly. No people, no text.
```

| Part | Matching text | What it does |
|---|---|---|
| Shot size and camera movement | `A slow wide shot`, `The camera pushes in very slowly` | Matches the official Composition and camera motion; the slower the movement, the better it works as a background |
| Subject | `A slim laptop in the center shows a plain dark dashboard` | Matches Subject; the interface is given as an outline only, so do not expect the model to draw your real product |
| Environment, lighting and style | `dark studio desk at night`, `A warm desk lamp on the left`, `Fine dust drifts in the light` | Matches Location and lighting; one light source sets the night-time look, and the drifting dust adds a little motion to a still image |
| Exclusions | `No people, no text.` | Your own copy will be layered over the background video, so no text should appear in the frame |

**Template 2: Product demo** (use with Frames to video, with a real screenshot as the start frame)

```text
Start from the uploaded screenshot of a web app dashboard. Keep the layout,
colors and every UI element exactly as they are. A cursor moves to the top
right button, clicks it, and a dropdown menu opens with a soft fade. The page
stays sharp and still apart from that one interaction. Slow, smooth motion.
No new text, no camera movement.
```

| Part | Matching text | What it does |
|---|---|---|
| Anchor to the reference image | `Start from the uploaded screenshot` | Matches the official tip that "the prompt has to point to the frames you gave" |
| Protected parts | `Keep the layout, colors and every UI element exactly as they are` | Stops the model from redrawing the interface; matches "text must not conflict with the reference image" |
| Action | `A cursor moves to the top right button, clicks it` | One clip performs one operation only; matches Subject and action |
| Exclusions | `No new text, no camera movement.` | Limits what can change and reduces distortion |

**Template 3: Feature illustration** (abstract motion graphics, good for explaining a flow)

```text
Three rounded rectangular cards float in a row on a soft light gray
background. A small blue dot travels from the first card to the second, then
to the third, leaving a thin glowing line behind it. Each card lifts slightly
when the dot arrives. Flat, clean motion graphics, soft shadows, gentle
easing. No text.
```

| Part | Matching text | What it does |
|---|---|---|
| Subject | `Three rounded rectangular cards float in a row` | Abstract shapes stand in for the three objects in your feature |
| Action | `A small blue dot travels from the first card to the second` | Makes the order of events clear |
| Style | `Flat, clean motion graphics, soft shadows, gentle easing` | Matches Alternative styles; the motion-graphics look is closer to a frontend interface |
| Exclusions | `No text.` | Copy and numbers are overlaid with HTML, which makes them easy to change and localise |

## Join clips into a finished film

One generation gives you only a few seconds to a dozen or so: Omni Flash 1.2 makes 3 to 10 seconds, up to 15 with a subscription; Veo 3.1 Lite makes 4, 6 or 8 seconds. A finished film has to join several shots and keep characters and scenes matching from shot to shot. This is Flow's core value over "one clip per generation".

The steps below walk the whole path with one example: the same character appears in three shots of 8 seconds each.

### Step 1: Fix the character and the scene

Three official mechanisms; choose as you need:

| Mechanism | How to create it | How to refer to it | Good for |
|---|---|---|---|
| **Character** | Select **Characters** on the left; when you already have characters, click **New Character**. Write a description, upload or generate 1 to 2 images (you need at least 1 to use it), click **Generate**; then name it, choose a voice and click **Done** | In the prompt, type `@` followed by the character's name, for example `@CaptainZoro walking through a futuristic city` | A character that appears again and again across the film |
| **ingredients** | Drag the reference images into the prompt box each time you generate | State in the prompt how each reference is to be used | An object or scene that appears in only a few shots |
| **Avatar** | In the profile menu at the top right, click **Create avatar**; start on a computer and finish by scanning a QR code with your phone | Type `@me` in the prompt | You are the person on screen |

Avatar is not available in the European Economic Area, the United Kingdom or Switzerland.

### Step 2: Produce the key stills first

Use Text to image to produce the reference stills for your characters and scenes first. The official blog has described how images and video connect: with Nano Banana built in, you can "create high-fidelity images and instantly use them as ingredients and frames for Veo video generations without ever leaving Flow". Images do not cost credits.

### Step 3: Generate shot by shot

Generate each shot with Ingredients to video or Frames to video. Check the composition at 360p first (1 credit per second), then produce the final version at 720p once you are happy.

### Step 4: Make the shots join up

- **Use the end of one shot as the start of the next**. Open shot A, pause on the frame where the join should be, hover and click **Save frame**. Google states that the saved frame can be used in later generations as an ingredient, start frame or end frame. Then set it as the start frame of shot B.
- **The shot is too short**. Click the clip, click **Extend** at the bottom and add 3 to 10 seconds; you can attach up to 3 reference images to keep the characters and the environment consistent.
- **The same character changes scene**. The official blog's definition of **Jump to** is in "Core concepts". The current help centre does not document its entry point, so check that it is still in your interface before you rely on it.

### Step 5: Arrange the clips in Scenebuilder

1. Hover over a finished clip, click **More**, then **Add to Scene**.
2. Open the scene (you will find it under **Scenes** in the left sidebar) and drag the clips into order.
3. Drag the handles at both ends to trim the start and end of each clip.
4. Preview the whole sequence.
5. Download the scene.

### Step 6: Take the finished film with you

Download the scene to get a video file. To publish to YouTube: a single clip can be sent straight from Flow by clicking **More** and then **Publish to YouTube**; a Scenebuilder sequence cannot. Google requires you to download it as a single file first, then upload it through YouTube Studio.

## Custom Tools and Agent

### Tools: build a small tool in natural language

**What it is**: you describe what you need in one sentence, and Flow writes the code and builds the interface. Google's example is "Make an image filter app with a slider for grayscale and hue shift." The uses listed on the landing page are caption overlays, changing the aspect ratio, storyboards and shaders.

**Who can use it**: Google is explicit.

- Using prebuilt Tools: all users.
- Creating and remixing: requires a Google AI Plus, Pro or Ultra subscription. Official: "If you're not subscribed, you can still explore and use pre-built tools."
- Platform: web and PC only.

**How to build the simplest tool** (official steps):

1. Enter the project, click **Tools** on the left, then **Create Tool**.
2. Describe the tool you want in the prompt box. Example from this site, not official text: `A tool that adds a caption bar to the bottom of a clip, with an editable text field.`
3. Click **Generate**.
4. Check the interface. When the agent has finished building, click **Save**.

**After you build it**:

- **Edit**: open the Tool, click **Edit**, describe on the right how the code should change, and click **Generate**.
- **Share**: click **Share** at the top right, then **Copy link**. Google warns that anyone with the link can see the Tool's code, name and thumbnail. The link shares only the version that existed when the link was created; later changes do not sync. The only way to stop sharing is to delete the Tool.
- **Pin, Favorite, Remix tool**: pin it to the current project, make it available globally, and make a copy to change yourself, respectively.

**Credits**: media generated by a Tool costs Flow credits as usual. Google states that when running a Tool may cost credits, Flow always shows a warning banner. There is a daily limit on how many Tools you can create; the help centre does not list a separate credit charge for "creating".

### Agent: the conversational assistant in the prompt box

**What it is**: Google calls it "a built-in creative collaborator". The landing page describes it as a project-level creative partner that helps you explore and iterate. The official blog adds that it is built on Gemini models.

**What it can do** (official list):

- **Brainstorm and plan**: lists shots, makes mood boards and turns a vague idea into a usable prompt.
- **Generate new media**: ask it to generate a video or an image, and it picks a suitable model.
- **Edit assets directly**: ask it to edit the assets selected in the project.
- **Batch generate**: generates several variations of one asset at a time.
- **Organize your assets**: renames files, sorts assets into a Collection and deletes unused assets.

**How to use it**:

1. Enter the project and click **Agent** in the prompt box to open it. Click again to close.
2. To open the side conversation panel, click **Expand**.
3. Write your request. To attach references, drag assets from your device or the project into the prompt box, or click **Add** to select or upload them.
4. Click **Generate**.

**Three settings to know**:

- **Confirm before generating**. By default, Agent asks you before any action that spends credits. Google warns that once you choose **Never**, it generates and spends credits for you without stopping to confirm. Keep **Always**.
- **Agent Instructions**. Click **Agent Instructions** and then **Add instruction** at the bottom of the prompt box; you can add a reference image and write rules so that Agent behaves consistently across the whole project.
- **Sessions**. Conversations are saved automatically as Sessions, kept separate per project. Click **Menu** at the top of the side panel to open, create, rename or delete a session. Deleting a session clears the conversation only; the generated assets remain.

**Credits**: media generated by Agent costs credits as usual and is saved automatically into the project that is currently open. Agent conversations themselves currently cost no credits; they follow a daily query limit specific to each plan.

## Real-world use cases

The three most common scenarios for a frontend engineer. The methods are this site's own, derived from the official steps; they are not official use cases.

| Scenario | Modes used | Expected output |
|---|---|---|
| Landing-page background video | Text to image to set the look, Text to video to make the clip | An 8 to 10 second MP4, plus a few lines of HTML |
| Product demo clip | Frames to video mainly, joined in Scenebuilder | A 15 to 30 second scene, downloaded as a single video |
| Animated storyboard for a PM demo | Agent lists the shots, 360p drafts, joined in Scenebuilder | A scene of 3 to 5 shots |

### Landing-page background video

- **What you want**: a looping banner background that does not compete with the text.
- **How**: use Template 1 from "How to write prompts" to generate 8 to 10 seconds. Exclude people and text in the prompt, and overlay the heading and copy on the video with HTML. Subscribers can upscale the finished clip to 1080p; upscaling 1 to 10 seconds costs no credits.
- **Expected output**: one `.mp4` file, plus the markup below.

```html
<!-- Background video: it must be muted to autoplay; the poster holds the space until the video loads -->
<video class="hero-bg" autoplay muted loop playsinline preload="metadata" poster="/hero-poster.jpg">
  <source src="/hero.mp4" type="video/mp4" />
</video>
```

Two reminders:

- The help centre does not say that Flow can generate a video that loops cleanly from end to start. Check the join yourself by watching the clip.
- A clip may carry native audio (with **Return silent videos** switched on in the project settings, all videos are generated silent), so the page must include `muted`; otherwise the browser's autoplay policy may block it.

### Product demo clip

- **What you want**: 15 to 30 seconds that demonstrate two or three operations of one feature.
- **How**: set a real screenshot as the start frame and set it in motion the way Template 2 does. One clip performs one operation; arrange several clips in Scenebuilder.
- **Expected output**: one scene, downloaded as a single video file.
- **A boundary to know**: the interface the model generates is "drawn", not a real screen recording of your product. That is good enough for a demo to a PM or inside the team. For an official external demo, use a real screen recording and use Flow clips only for the opening and transitions.

### Animated storyboard for a PM demo

- **What you want**: several screens of one feature set in motion in order, for a review discussion.
- **How**: first have Agent list the shots, then turn each shot into a prompt. Draft each shot first with Omni Flash 1.2 at 360p, at 1 credit per second; 4 shots of 8 seconds come to 32 credits. Upscale the ones you pick; for subscribers, upscaling 1 to 10 seconds to 1080p costs no credits. When the same character has to run through the whole piece, create a Character first.
- **Expected output**: a scene of 3 to 5 shots, plus a set of storyboard prompts you can implement as written.

## Credits

The figures come from [Manage your Google Flow credits](https://support.google.com/flow/answer/16526234) as of 2026-11-24, and are **not** copied from third-party blogs.

| Tier | Flow credits |
|---|---|
| No subscription | **50 per day** (trial; unused daily credits do not roll over) |
| AI Plus | **200 per month** (plus 50 per day) |
| AI Pro | **1,000 per month** (plus 50 per day) |
| AI Ultra $100 (Ultra 5x on this site) | **10,000 per month** (plus 50 per day) |
| AI Ultra $200 (Ultra 20x on this site) | **25,000 per month** (plus 50 per day) |

Key points:

- The monthly credits for subscribers are **extra**. Official wording: "With or without a subscription, you receive 50 Google Flow credits per day. Subscribers receive extra Google Flow credits".
- Paid tiers refresh on the **billing cycle**, and unused monthly credits **do not roll over**.
- The daily credits refresh is triggered by the first generation of the day. Google's example: your first use is on 12 August, and the next batch of 50 credits is available on 13 August.
- After the allocation runs out, Plus / Pro / Ultra can buy extra AI credits to keep going (except in Japan). The same AI credits also work in [Antigravity](./antigravity).
- Official: "To generate content in Google Flow, you need to use Google Flow credits or AI credits." Credits are shared across the account; switching device does not switch the ledger.
- Check the balance: click your profile picture at the top right; the remaining credits sit under it. Plus / Pro / Ultra can also see a breakdown of charges and the next refresh date.

The whole subscription table for the four tiers (storage, model multiplier, Cloud credit and so on) lives **only** in the [cheatsheet](./gemini-cheatsheet#subscription-tiers).

<!-- TODO: needs verification — the USD list prices on the landing page (Plus $4.99 / Pro $19.99 / Ultra $99.99 / $199.99) carry “* Prices may vary by market”. The one.google.com comparison page drops the amounts when it is scraped; family-wide prices still follow the official page for your region -->

### Which actions cost credits

Google warns that "Limits are subject to change at any time". Check the latest prices in **Settings** at the top right of the prompt box.

| Action | Charged | How much (as of 2026-11-24) |
|---|---|---|
| Generate or edit video with Omni Flash 1.2 | Yes | 1 credit per second at 360p; 3 credits per second at 720p. All users can generate up to 10 seconds |
| Generate 11 to 15 seconds with Omni Flash 1.2 | Yes | Subscribers only. For the part beyond 10 seconds, 2 credits per second at 360p and 6 credits per second at 720p |
| Generate 4, 6 or 8 seconds with Veo 3.1 Lite | Yes | 10 credits per generation; 5 credits per generation for Ultra subscribers |
| Lower Priority mode on Veo 3.1 Lite | No | Ultra 20x subscribers and family group managers only |
| Omni Extend | Yes | Subscribers only. For every 1 second added, 1 credit at 360p and 3 credits at 720p |
| Upscale 360p to 720p or 1080p | No for 1 to 10 seconds | Subscribers only. 1 credit per second for the part beyond 10 seconds |
| Upscale to 4K | Yes | Ultra only. A flat 50 credits for 1 to 10 seconds; 5 credits per second for the part beyond 10 seconds |
| Generate 8 seconds with Veo 3.1 Quality (retiring soon) | Yes | 100 credits per generation for all users |
| Generate or upscale images | No | Follows the daily cap; see the next table |
| Agent conversations | No | Each plan has a daily query limit; media generated by Agent costs credits as usual |
| Create a Tool | Not listed by Google | There is a daily limit on how many you can create; media generated by a Tool costs credits as usual |
| A generation fails, or trips the safety filter | No | Credits are charged when the generation starts and returned within an hour |
| Retry | Yes | Inferred from the official "costs are per generation, not per request"; not an official sentence |
| Save a version, save a frame, download, arrange in Scenebuilder | No charge listed by Google | The credits page lists no charge for any of these |

The daily caps for images come from [Create & edit images in Flow](https://support.google.com/flow/answer/16729550):

| Model or action | No subscription | AI Plus and Pro | AI Ultra |
|---|---|---|---|
| Nano Banana Pro | 20 per day | 100 per day | 500 per day |
| Nano Banana 2.1 and 2 Lite (shared) | 400 per day | 1,000 per day | 1,000 per day |
| 2K upscale | 200 per day | 200 per day | 200 per day |
| 4K upscale | Not available | Not available | 200 per day |

The daily cap resets 24 hours after the first time you use that model on a given day. An image generation that fails or is blocked by the safety filter does not count towards the daily cap.

## When to use it, and when not to

| I want to… | Use | Do not use Flow |
|---|---|---|
| A landing-page / launch / product-demo **video** | **Flow** | Canvas produces a clickable page, not a finished film |
| Give a product manager a **clickable prototype** within half an hour | [Canvas](./canvas) | Flow does not do DOM or interaction |
| Get the chosen design into the repository | [Antigravity](./antigravity) | Flow does not change code or open a PR |
| Songs / music videos / a generative score | [Flow Music](https://www.flowmusic.app/) (credits are **separate** from Flow) | Do not treat Flow video credits as music credits |

The Flow Music row rests on an official statement: "Google Flow Music credits are separate from your Google AI credits."

A useful combination: try three interaction directions in Canvas, pick one, and hand it to Antigravity to implement in the project. When you need to present the feature to others, make an 8 to 10 second demo clip in Flow.

## What it is

Google calls it an **AI creative studio**: you plan, generate and refine in natural language, on top of Google's generative models.

The landing page currently lists three model families:

| Model | Official one-liner |
|---|---|
| **Gemini Omni** | Creates and edits video from any input reference (real or generated); stresses world understanding, multimodality and conversational editing |
| **Nano Banana** | Image generation and fine-grained editing; stresses subject consistency, text rendering and reasoning |
| **Veo 3.1** | Video generation; stresses physics, realism and prompt adherence, with native audio and extended controls |

The help centre uses more specific model names, which line up with the families like this:

| Family (the landing page's name) | Specific models in the help centre (as of 2026-11-24) | Status |
|---|---|---|
| Gemini Omni | Omni Flash 1.2; Omni Flash 1.1 | 1.1 retires on 2026-12-05 |
| Veo 3.1 | Veo 3.1 Lite; Veo 3.1 Fast; Veo 3.1 Quality | Fast and Quality retire on 2026-12-05 |
| Nano Banana | Nano Banana Pro; Nano Banana 2.1; Nano Banana 2 Lite | Image models, used to generate frames and reference material |

**What it can do**, from the capabilities listed on the [product landing page](https://labs.google/fx/tools/flow) and in the [Pro benefits page](https://support.google.com/googleone/answer/14534406):

- **Generation modes**: Text to video, Frames to video, Ingredients to video, Text to image, Image to image
- **Refinement**: Video Extension, Video-to-video editing, Scenebuilder
- **Cast**: Characters, Avatars
- **Agent**: described officially as a project-level creative partner that helps you explore and iterate
- **Custom Tools**: build tools in natural language (caption overlays, changing the aspect ratio, storyboards, shaders); share and remix. The free tier can only **use** existing Tools; **creating** them starts at Plus

**Outputs carry a watermark**. Official: "All outputs generated in Google Flow using Veo, Omni, or Nano Banana include invisible SynthID watermarks." You control the visible watermark with the "Visible watermarking" switch in the profile drop-down menu. Users who live in India, South Korea or Vietnam and are not on Ultra 20x get a visible watermark automatically.

**Commercial use**: Google's answer is that the Terms of Service decide, and the terms say Google claims no ownership of the generated content.

It is off the coding main line. The counterpart in the Claude family is [Claude Design](../claude/claude-design): Design hands off an interface prototype; Flow hands off film you can publish.

## Common pitfalls

Every row names its official source. Unless another source is given, the source is one of seven help centre pages: [Get started](https://support.google.com/flow/answer/16353333), [Create videos](https://support.google.com/flow/answer/16353334), [Edit & Scenebuilder](https://support.google.com/flow/answer/16935718), [Models & supported features](https://support.google.com/flow/answer/16352836), [Credits](https://support.google.com/flow/answer/16526234), [Available regions](https://support.google.com/flow/answer/16353544) and [Agent](https://support.google.com/flow/answer/17093911).

| Symptom | Cause | Fix |
|---|---|---|
| It will not open, or it says your region is unsupported | Mainland China is not on the supported list | Check the [available regions](https://support.google.com/flow/answer/16353544). A VPN **cannot** get around this: Google writes "VPNs will not enable access in unsupported regions" |
| You have a VPN on and get "We noticed some unusual activity" | Google asks you to turn off VPN and proxy | Google's two steps: retry after a few minutes; disable the VPN or proxy |
| You subscribed to AI Pro and still cannot get in | Flow is not open in every country where AI Pro is sold | Check the supported list before you buy. If you are in a supported region, contact Google One support |
| Without a subscription, you cannot generate video at certain times | Non-subscribers are restricted during peak hours (about 14:00 to 17:00 UTC) | Stay clear of 22:00 to 01:00 the next day, Beijing time; you can still generate images and use Agent during that window |
| It says you are short of credits | Video is charged per second or per generation. 8 seconds at 720p on Omni Flash 1.2 is 24 credits | Check the balance under your profile picture at the top right. Switch to 360p drafts, or to Veo 3.1 Lite at 10 credits a generation |
| The generation failed, yet your balance went down | Official: credits are charged when the generation starts; after a failure or a safety-filter block, the credits are returned within an hour | Wait an hour. The balance and the charge record may update a little later. If it is still wrong, contact Google One support |
| You get "Audio Generation Failed" | When Veo's audio quality does not meet the bar, the video is not generated and the credits are returned | Retry, or change the prompt. If you would rather have a silent video, switch on **Return silent videos** in the project settings; the video is then generated and charged as usual |
| The character is inconsistent from shot to shot | No references were carried between shots | Create a Character and refer to it with `@name`, or attach ingredients and start and end frames every time. Use reference images with a clean background and keep the style consistent across them |
| One request charged several lots of credits | The charge is per generation, not per request; asking for 2 candidates means 2 lots | Set **Number of outputs you want** to 1. Test at 360p first, then go to 720p once you are happy |
| You kept retrying because you disliked the result, and the credits soon ran out | Every retry is a new generation | Change the prompt first. Send it to Gemini or to Agent in Flow for help with rewriting; the conversation itself costs no credits |
| You write prompts in Chinese and the results are unstable | Google recommends English prompts; results in other languages vary with the language and the complexity | Write prompts in English. Gemini can translate and rewrite them for you |
| You mistook Flow credits for Flow Music credits | Official: "Google Flow Music credits are separate from your Google AI credits." | Keep the two ledgers separate |
| You picked a feature and the model was switched automatically | The current model does not support that feature, so Flow suggests switching to a compatible model | Before you generate, confirm the model, the resolution and the latest prices in the prompt box settings |
| You want a person in an uploaded video to lip-sync and speak new lines | In all regions, Google does not support editing or generating the speech of people in an uploaded video | Use a prompt to generate a new video. The picture, background sound, music and sound effects can still be edited |
| You generate a celebrity, or edit an uploaded video featuring a minor | Google does not support this in any region | Change the subject |
| You get "You're requesting generations too quickly" | The platform is rate-limiting you, most visibly on zero-credit models | Wait a while and try again |
| A card stays on "Pending" | There may be a system notification you have not dealt with; failures caused by a policy or a credit limit need manual handling | Check the system notifications at the top right. Retry by hand, or delete the card |
| You added a voice reference and got an error | Voice references work only for video generations that use ingredients | Switch to Omni Flash, go through Video and Ingredients, then click Add and Voices |
| Extend does not work | Subscribers only, Omni Flash 1.2 only, web only; Veo Extend retired on 2026-11-05 | Try again once all three are met |
| The film you downloaded has a visible watermark | It is added automatically if you live in India, South Korea or Vietnam and are not on Ultra 20x; in other regions the switch decides | Check "Visible watermarking" in the profile drop-down menu. The invisible SynthID is always there, and Google asks you not to remove it |
| You see an official page saying "you must subscribe to use it" | That is the wording of an older version of the "Get started" page, still readable from some caches on 2026-11-24 | The live page on the same day agrees with the credits page: without a subscription you can still use basic video generation and editing, with 50 credits a day |

## Flow Sessions

**Flow Sessions** on the [landing page](https://labs.google/fx/tools/flow) is an artist collaboration programme: a small group of creators are invited to make passion projects with Flow and to work with Google. **It is not an everyday product.** Frontend engineers do not need to learn it separately, and it should not be written up as a tutorial.

## Next steps

- To call Veo or Nano Banana from your own code, go to [AI Studio](./ai-studio).
- To decide which plan to subscribe to, see [Google AI subscriptions](./google-pro).
- For a clickable prototype, see [Canvas](./canvas).
- For where Flow sits in the Gemini family, see the [glossary](./gemini-glossary).
- To see how other people write prompts, go to [Flow TV](https://labs.google/flow/tv). Official note: browse the channels with the remote control at the bottom of the screen to see the prompt behind each clip.

## Official resources and further reading

Help centre, one line per article:

- [Flow help centre](https://support.google.com/flow): the index of every official article.
- [Get started with Google Flow](https://support.google.com/flow/answer/16353333): the official Q&A on who can use it, how to get in, errors and watermarks.
- [Create videos in Google Flow](https://support.google.com/flow/answer/16353334): the steps for the three video generation methods, adding frames, adding reference material and adding voice, plus the official prompt principles.
- [Edit videos & build scenes in Google Flow](https://support.google.com/flow/answer/16935718): Extend, editing an existing video, saving frames, Scenebuilder.
- [Learn about Google Flow models & supported features](https://support.google.com/flow/answer/16352836): the official mode-by-model support table and retirement dates.
- [Manage your Google Flow credits](https://support.google.com/flow/answer/16526234): allowances, refresh rules and the charge for each item.
- [Where you can use Google Flow](https://support.google.com/flow/answer/16353544): supported languages and countries or regions, plus the feature restrictions by region.
- [Create & edit images in Flow](https://support.google.com/flow/answer/16729550): generating and editing images, and the daily caps.
- [Manage your Flow projects, assets & collections](https://support.google.com/flow/answer/16935308): projects, assets, Character, downloading, sharing, publishing to YouTube.
- [Use the Google Flow Agent](https://support.google.com/flow/answer/17093911): turning Agent on and off, sessions, instructions and default settings.
- [Create & manage Tools in Google Flow](https://support.google.com/flow/answer/17104535): creating, editing and sharing Tools.
- [Create & use your avatar in Google Flow](https://support.google.com/flow/answer/17102997): putting your own likeness into a video with `@me`.
- [Use keyboard shortcuts in Google Flow](https://support.google.com/flow/answer/17069754): the shortcut table.
- [Manage your data in Google Flow](https://support.google.com/flow/answer/17025472): how your data is used and how to delete it.
- [Download your Google Flow data](https://support.google.com/flow/answer/17571126): export every project through Google Takeout.
- [Google AI Pro benefits list](https://support.google.com/googleone/answer/14534406): the original text of the Flow and Flow Music benefits in Pro.

Official blog, in time order:

- [Meet Flow: AI-powered filmmaking with Veo 3](https://blog.google/innovation-and-ai/products/google-flow-veo-ai-filmmaking-tool/): the launch post from May 2025.
- [5 tips for getting started with Flow](https://blog.google/innovation-and-ai/products/flow-video-tips/): 2025-06-25, the official prompt elements, plus the definitions of Jump to and Extend.
- [Introducing Veo 3.1 and advanced capabilities in Flow](https://blog.google/innovation-and-ai/products/veo-updates-flow/): 2025-10-15, the official explanation of Ingredients, Frames and Extend.
- [New ways to create and refine content in Flow](https://blog.google/innovation-and-ai/models-and-research/google-labs/flow-updates-february-2026/): 2026-02-25, the interface redesign and image generation folded into Flow.
- [New agents, mobile apps and Gemini Omni for Google Flow and Google Flow Music](https://blog.google/innovation-and-ai/models-and-research/google-labs/flow-updates/): 2026-05-19, the announcement of Agent, Tools and the mobile apps.
- [Google Flow brings new creative control features to enhance video editing](https://blog.google/innovation-and-ai/models-and-research/google-labs/new-creative-controls-google-flow/): 2026-08-27, start and end frames, 1080p and 4K export, 360p drafts.
- [Google Labs blog](https://blog.google/innovation-and-ai/models-and-research/google-labs/): follow later updates here.

Other entry points:

- [Product entry](https://labs.google/fx/tools/flow)
- [Flow TV](https://labs.google/flow/tv): the official showcase page for clips; use the remote control at the bottom of the screen to see the prompt behind each clip. [labs.google/fx FAQ](https://labs.google/fx/faq): the data and policy notes that the help centre points to.

## Related pages

- [Subscriptions and quota](./google-pro) — other coding-relevant Pro entitlements
- [Canvas](./canvas) — clickable prototypes
- [Cheatsheet](./gemini-cheatsheet#which-tool) — pick a tool by task
- [AI Studio](./ai-studio) — calling Veo and Nano Banana from code
- [Glossary](./gemini-glossary) — where Flow sits in the Gemini family
