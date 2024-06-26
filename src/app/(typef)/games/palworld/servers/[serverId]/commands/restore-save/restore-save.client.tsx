"use client";

import { cn } from "@/(global)/lib/css/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/(global)/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/(global)/components/ui/popover";
import { useState } from "react";
import { Button } from "@/(global)/components/ui/button";
import { toast } from "@/(global)/components/ui/use-toast";
import { ScrollArea } from "@/(global)/components/ui/scroll-area";
import { Icons } from "@/(global)/components/ui/icons";

import { getSavesAction, restoreSaveAction } from "./restore-save.action";
import { useMutation, useQuery } from "@tanstack/react-query";
import { actionWithErrorHandling } from "@/(global)/lib/request/next-safe-action";
import { useError } from "@/(global)/components/error-toast/error-toast";
import { configs } from "@/(global)/configs/servers/palworld";
import { usePathSegments } from "@/(global)/hooks/path";

export function ClientComponent() {
    const { serverId } = usePathSegments();

    const [comboBoxOpen, setComboBoxOpen] = useState(false);
    const [comboBoxValue, setComboBoxValue] = useState("");

    const {
        isError,
        isPending,
        data: saves,
        error,
    } = useQuery({
        queryKey: ["palworld", "saves"],
        queryFn: actionWithErrorHandling(() =>
            getSavesAction({ serverId: serverId })
        ),
    });

    useError(isError, error);

    function handleLoadSaveFiles(open: boolean) {
        setComboBoxOpen(open);
    }

    return (
        <div className="flex flex-row items-center justify-between w-full md:w-[300px] ">
            <Popover open={comboBoxOpen} onOpenChange={handleLoadSaveFiles}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={comboBoxOpen}
                        className="w-full justify-between text-ellipsis overflow-hidden"
                    >
                        {comboBoxValue ? comboBoxValue : "Select Backup Save"}
                        <Icons.caret_sort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search" />
                        <CommandGroup>
                            <ScrollArea className="max-h-[200px]">
                                {saves?.saveFiles.length == 0 ? (
                                    <div className="py-6 text-center text-sm">
                                        No save files found.
                                    </div>
                                ) : (
                                    saves?.saveFiles.map((filename) => (
                                        <CommandItem
                                            key={filename}
                                            value={filename}
                                            onSelect={(currentValue) => {
                                                setComboBoxValue(
                                                    currentValue ===
                                                        comboBoxValue
                                                        ? ""
                                                        : saves.saveFiles.find(
                                                              (savfile) =>
                                                                  savfile.toLowerCase() ===
                                                                  currentValue
                                                          ) ?? ""
                                                );
                                                setComboBoxOpen(false);
                                            }}
                                        >
                                            {filename}
                                            <Icons.check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    comboBoxValue === filename
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))
                                )}
                            </ScrollArea>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            <RenderRestoreButton
                saveFile={comboBoxValue}
                saveId={saves?.saveId}
                serverId={serverId}
            />
        </div>
    );
}

const RenderRestoreButton = ({
    saveFile,
    saveId,
    serverId,
}: {
    saveFile: string;
    saveId: string | undefined;
    serverId: number;
}) => {
    const action = actionWithErrorHandling(restoreSaveAction);
    const { isError, isPending, mutate, error } = useMutation({
        mutationFn: action,
        onSuccess: (response) => {
            toast({
                title: "Success",
                description: `${response?.message}`,
            });
        },
    });

    function handleRestoreSave() {
        if (isPending || !saveId) return;

        mutate({
            serverId: serverId,
            saveFile: saveFile,
            saveId: saveId,
        });
    }

    useError(isError, error);

    return (
        <Button
            variant="outline"
            size="icon"
            className="ml-2"
            onClick={handleRestoreSave}
            disabled={!saveFile || isPending}
        >
            {isPending ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
                <Icons.upload />
            )}
        </Button>
    );
};
