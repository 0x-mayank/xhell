# xhell

Transform your terminal into a powerful command center for X (Twitter). xhell uses a global configuration system to manage your social presence from any directory on your computer—no more juggling `.env` files.

## Features

**Global Authentication**  
Configure your API keys once, and they are stored securely in your system's global config folder.

**Text & Media Posting**  
Post standard tweets or upload images using the `-i` flag. xhell handles the complex multi-step process of uploading media to the v1.1 API and linking it to a v2 tweet automatically.

**The Undo Button**  
Made a typo? The `undo` command tracks the ID of your very last post and deletes it instantly.

**Drafts System**  
Save ideas locally without posting them. You can list all your drafts and clear them as needed.

**Account Dashboard**  
The `whoami` command gives you a quick snapshot of your followers, following count, and recent activity.

## Installation

```bash
npm install -g xhell
```

## Getting Started

### Step 1: Configure Read and Write Permissions

Before running the setup, you must enable Read and Write permissions for your X Developer App. If you skip this step, you will receive a 403 Forbidden error when trying to post.

#### In the X Developer Portal:

1. **Navigate to Your App**: Go to the [X Developer Portal Dashboard](https://developer.x.com/en/portal/dashboard) and select your App

2. **Open App Settings**: Click the gear icon to access Settings

3. **Edit User Authentication Settings**: Click the **Edit** button in the User Authentication Settings section

4. **Set App Permissions**: Change the permission level from "Read" to **Read and Write**

5. **Select App Type**: Choose **Web App, Automated App or Bot**

6. **Fill Required Fields**:
   - **Callback URI**: Enter `http://localhost:3000` (required but not used)
   - **Website URL**: Enter `https://google.com` (required but not used)

7. **Save Changes**: Click Save

8. **CRITICAL STEP - Regenerate Tokens**: Navigate to the **Keys and Tokens** tab and click **Regenerate** next to your Access Token and Secret

   **Important**: Your existing tokens are permanently locked to "Read" permissions. Only newly generated tokens will inherit the "Read and Write" permissions you just configured. You must regenerate your tokens after changing permissions.

### Step 2: Run the Setup Wizard

Once you have Read and Write credentials:

```bash
xhell setup
```

The wizard will prompt you for four credentials:

- **API Key**: Your app's public identifier
- **API Secret**: Your app's secret key
- **Access Token**: Your account's public token
- **Access Token Secret**: Your account's secret token

All credentials are stored globally using the `conf` library in a hidden folder on your system. You can safely delete any local `.env` files.

### Step 3: Verify Your Setup

```bash
xhell whoami
```

This command fetches your account information and displays your profile, follower count, and recent activity.

## Usage

### Post a Tweet

```bash
xhell post "Hello from the command line!"
```

### Post with an Image

```bash
xhell post "Check out this screenshot" -i "/path/to/image.png"
```

The `-i` flag accepts a string path to your image file. xhell uploads it to the Twitter v1.1 API and attaches it to your v2 tweet automatically.

### Undo Your Last Post

```bash
xhell undo
```

Deletes the last tweet you posted using xhell. The tweet ID is stored locally and cleared after deletion.

### Save a Draft

```bash
xhell draft "Great idea for later"
```

Saves your text locally without posting. Drafts include a timestamp for reference.

### List All Drafts

```bash
xhell drafts
```

Displays all saved drafts with an index number and preview (first 50 characters).

### Clear Drafts

```bash
xhell clear-drafts
```

Removes all saved drafts from local storage.

## Troubleshooting

### 403 Forbidden Error

This error means your credentials have "Read-only" permissions. Follow the instructions in **Step 1: Configure Read and Write Permissions** above. Remember that you MUST regenerate your Access Token and Secret after changing permissions in the portal.

### No Recent Tweet Found

The `undo` command only tracks tweets posted through xhell. If you posted through the X website or another app, xhell cannot delete it.

### Configuration Location

Your credentials are stored in a global config folder:
- **macOS/Linux**: `~/.config/xhell-nodejs/`
- **Windows**: `%APPDATA%\xhell-nodejs\`

## Commands Reference

| Command | Description |
|---------|-------------|
| `xhell setup` | Run the configuration wizard |
| `xhell post <text>` | Post a tweet |
| `xhell post <text> -i <path>` | Post a tweet with an image |
| `xhell undo` | Delete your last posted tweet |
| `xhell draft <text>` | Save text as a draft |
| `xhell drafts` | List all saved drafts |
| `xhell clear-drafts` | Remove all drafts |
| `xhell whoami` | Display your account information |

## Author 
Mayank.