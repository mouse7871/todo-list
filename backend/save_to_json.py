import json
import resource.get_resource as resource

def save_json(file, file_name="resource", path="./"):
    save_path = f"{path}/{file_name}.json"
    if isinstance(file, dict):
        save_file = open(save_path, 'w', encoding='utf-8')
        json.dump(file, save_file, ensure_ascii=False, indent="\t")
        save_file.close()
        print("Success Save JSON!😊")

        # with open(save_path, 'w', encoding='utf-8') as f:
        #     json.dumps(file, f, ensure_ascii=False, indent="\t") # or indent=4
    else :
        print("Please Check Your Resource Type!🤔", type(file))
        print("Only dict type can access.")

resource = {
    "quotes": resource.get_quote_by_naver("명언"),
    "photos": resource.get_photo_by_unsplash("wallpapers"),
}

print(len(resource['quotes']), len(resource['photos']))

save_json(resource, "resource", "./")