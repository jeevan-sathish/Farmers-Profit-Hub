
import gspread

# Connect to Google Sheets
gc = gspread.service_account(
    filename="./credentials.json"
)

# Open spreadsheet
spreadsheet = gc.open("pythontestemail")

# Select worksheet
sheet = spreadsheet.sheet1


def save_job(company, title, email, status):
    sheet.append_row([
        company,
        title,
        email,
        status
    ])

    print("Job saved successfully!")
